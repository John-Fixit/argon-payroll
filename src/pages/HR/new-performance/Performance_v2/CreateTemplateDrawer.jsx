import { Drawer, Input } from "antd";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { useCreateTemplate } from "../../../../API/performance";
import { validateSectionRespondent } from "../../../../utils/validateSectionRespondent";
import { errorToast, successToast } from "../../../../utils/toastMsgPop";
import FormBuilder from "../../Performance/Setup/FormBuilder";
import useCurrentUser from "../../../../hooks/useCurrentUser";
const CreateTemplateDrawer = () => {
  const [openNewAppraisalDrawer, setOpenNewAppraisalDrawer] = useState(false);
  const [appraisalHeader, setAppraisalHeader] = useState("");
  const [isOpenNewHeaderModal, setIsOpenNewHeaderModal] = useState(false);

  const { mutateAsync: createTemplate, isPending: isSubmitting } =
    useCreateTemplate();

  const { userData } = useCurrentUser();

  const openHeaderModal = () => {
    setIsOpenNewHeaderModal(true);
  };
  const closeHeaderModal = () => {
    setIsOpenNewHeaderModal(false);
  };
  const handleOpenNewAppraisal = () => {
    setOpenNewAppraisalDrawer(true);
  };
  const handleCloseNewAppraisal = () => {
    setOpenNewAppraisalDrawer(false);
  };
  const handleSaveAppraisalHeader = () => {
    closeHeaderModal();
    handleOpenNewAppraisal();
  };

  const handleSubmit = async (data) => {
    const validVisibility = validateSectionRespondent(data);

    if (validVisibility) {
      const json = {
        company_id: userData?.data?.COMPANY_ID,
        staff_id: userData?.data?.STAFF_ID,
        title: data.appraisalHeader,
        template: JSON.stringify(data.allSection),
      };

      try {
        const res = await createTemplate(json);
        successToast(res?.data?.message);
        handleCloseNewAppraisal();
      } catch (err) {
        const errMsg = err?.response?.data?.message || err?.message;
        errorToast(errMsg);
      }
    }
  };

  return (
    <>
      <motion.button
        onClick={openHeaderModal}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-lg font-medium shadow-lg hover:bg-primary/90 transition-all"
      >
        <Plus size={20} />
        Create Template
      </motion.button>

      <Modal
        isOpen={isOpenNewHeaderModal}
        onClose={closeHeaderModal}
        isDismissable={false}
        placement="top"
      >
        <ModalContent>
          <ModalBody>
            <div className="space-y-4 pt-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2 text-lg">
                  Form Title
                </label>
                <Input
                  size="large"
                  value={appraisalHeader.header}
                  onChange={(e) =>
                    setAppraisalHeader({
                      ...appraisalHeader,
                      header: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex justify-end">
                <Button color="primary" onPress={handleSaveAppraisalHeader}>
                  Continue
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Drawer
        open={openNewAppraisalDrawer}
        maskClosable={false}
        width={"1500px"}
        onClose={handleCloseNewAppraisal}
      >
        <FormBuilder
          role="builder"
          appraisalHeader={appraisalHeader}
          setAppraisalHeader={setAppraisalHeader}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </Drawer>
    </>
  );
};

export default CreateTemplateDrawer;
