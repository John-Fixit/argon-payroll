export function createElementLookupMap(templateConfig, templateId) {
  const lookupMap = new Map();

  templateConfig.forEach((section) => {
    section.formElements.forEach((element) => {
      lookupMap.set(element.elementKey, {
        template_key: templateId,
        section_key: section.sectionId,
        element_key: element.elementKey,
        label: element.label,
        type: element.type,
      });

      // Add sub-questions to lookup map
      if (element.sub_question && Array.isArray(element.sub_question)) {
        element.sub_question.forEach((subQuestion) => {
          lookupMap.set(subQuestion.elementKey, {
            template_key: templateId,
            section_key: section.sectionId,
            element_key: subQuestion.elementKey,
            parent_element_key: element.elementKey,
            label: subQuestion.label,
            type: subQuestion.type,
          });
        });
      }
    });
  });

  return lookupMap;
}

export function mapResponsesUsingLookup(lookupMap, responses) {
  const result = [];
  const parsedResponses =
    typeof responses === "string" ? JSON.parse(responses) : responses;

  Object.entries(parsedResponses).forEach(([elementKey, answer]) => {
    const metadata = lookupMap.get(elementKey);
    if (metadata) {
      result.push({
        ...metadata,
        answer: answer,
      });
    }
  });

  return result;
}

export function checkRequiredFieldsAnswered(formSections, answers) {
  // Get all required elements from the form sections
  const requiredElements = [];

  formSections.forEach((section) => {
    section.formElements.forEach((element) => {
      if (element.isRequired) {
        requiredElements.push({
          sectionId: section.sectionId,
          elementKey: element.elementKey,
          label: element.label,
          type: element.type,
        });
      }
    });
  });

  // Create a Set of answered element keys for faster lookup
  const answeredKeys = new Set(
    answers
      .filter((ans) => ans.answer && ans.answer.trim() !== "") // Filter out empty answers
      .map((ans) => ans.element_key),
  );

  // Find unanswered required fields
  const unansweredFields = requiredElements.filter(
    (req) => !answeredKeys.has(req.elementKey),
  );
  return {
    allAnswered: unansweredFields.length === 0,
    totalRequired: requiredElements.length,
    totalAnswered: requiredElements.length - unansweredFields.length,
    unansweredFields: unansweredFields,
    missingCount: unansweredFields.length,
  };
}
