import PropTypes from "prop-types";
import { Button, Drawer } from "antd";
import { LuDownload } from "react-icons/lu";
import { useRef } from "react";
import html2pdf from "html2pdf.js";
import SalaryVariationAdvice from "./SalaryVariationAdvice";

const VariationTemplateDrawer = ({ isOpen, handleClose, variationDetail }) => {
  const componentRef = useRef();

  const handleDownload = async () => {
    if (!componentRef?.current) return;

    const element = componentRef.current;

    try {
      // Convert all images to base64

      // Wait a bit for the src changes to take effect
      // await new Promise((resolve) => setTimeout(resolve, 300));

      const opt = {
        margin: 0.2,
        filename: `${
          variationDetail?.data?.summary?.variation_name
        }_variation_${new Date().getTime()}.pdf`,
        image: {
          type: "jpeg",
          quality: 0.98,
        },
        html2canvas: {
          scale: 3,
          useCORS: true,
          allowTaint: true, // Allow tainted canvas when using base64
          logging: false,
        },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
        },
      };

      html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };

  return (
    <>
      <Drawer
        width={920} //620 for shopping and services
        onClose={handleClose}
        open={isOpen}
        title={
          <div className="flex justify-end mb-4">
            <Button
              shape="circle"
              icon={<LuDownload size={20} />}
              onClick={handleDownload}
            />
          </div>
        }
        className="bg-[#F5F7FA] z-[10]"
        classNames={{
          header: "font-helvetica bg-[#F7F7F7]",
        }}
      >
        <SalaryVariationAdvice
          variationDetail={variationDetail}
          componentRef={componentRef}
        />
      </Drawer>
    </>
  );
};

export default VariationTemplateDrawer;

VariationTemplateDrawer.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  variationDetail: PropTypes.shape({
    approvers: PropTypes.array,
    attachments: PropTypes.array,
    data: PropTypes.any,
    notes: PropTypes.array,
    requestID: PropTypes.any,
  }),
};
