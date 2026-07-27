import { ConfigProvider, Image, Modal } from "antd";
import useFileModal from "../../hooks/useFileModal";
import { filePrefix } from "../../utils/filePrefix";
import { useEffect, useMemo, useState } from "react";

const FileModal = () => {
  const { isOpen, closeModal, filePath } = useFileModal();

  

  



  const prependBaseURL = (filePath) => {
    // Check if the file path already has a base URL
    if (filePath?.startsWith("http://") || filePath?.startsWith("https://")) {
      return filePath; // Return the original file path if it has a base URL
    } else {
      return `${filePrefix}${filePath}`; // Prepend the base URL
    }
  };

  const fullPath = prependBaseURL(filePath)

  const fileExtension = fullPath?.split(".")?.pop()?.toLowerCase();

  //============used this codes to force refresh the ifrrame because it is caching the previous file displayed=============

  const uniqueUrl = useMemo(() => `${fullPath}?timestamp=${new Date().getTime()}`, [fullPath]);

  //================= ends here ===================

  const renderContent = () => {
    if (fileExtension === "pdf") {
      return (
        <iframe
          src={uniqueUrl}
          className="w-full h-[85vh]"
          frameBorder="0"
          title="PDF Preview"
        ></iframe>
      );
    } else if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
      return (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: isOpen,
            onVisibleChange: () => closeModal(),
          }}
          src={fullPath}
        />
      );
    } else if (["doc", "docx"].includes(fileExtension)) {
      return (
        <iframe
          src={`https://docs.google.com/gview?url=${uniqueUrl}&embedded=true`}
          className="w-full h-[85vh]"
          frameBorder="0"
          title="Preview docx"
        ></iframe>
      );
    } else {
      return <p>File format not supported for preview.</p>;
    }
  }

  return (
    <>
      {["jpg", "jpeg", "png", "gif"].includes(fileExtension) ? (
        renderContent()
      ) : (
        <ConfigProvider
          theme={{
            components: {
              Modal: {},
            },
          }}
        >
          <Modal
            open={isOpen}
            onCancel={closeModal}
            footer={null}
            width={"auto"}
            className="!top-[20px] !z-[1002]"
          >
            <div className="mt-6">
              {renderContent()}
            </div>
          </Modal>
        </ConfigProvider>
      )}
    </>
  );
};

export default FileModal;
