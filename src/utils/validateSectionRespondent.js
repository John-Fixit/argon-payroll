import { formatError } from "./messagePopup";

export const validateSectionRespondent = (data) => {
  const allHasRespondent = data.allSection.every((section) => {
    return section.respondent !== "";
  });

  if (!allHasRespondent) {
    formatError(
      "Please choose section respondent. All sections must have a respondent"
    );
    return false;
  }
  return true;
};
