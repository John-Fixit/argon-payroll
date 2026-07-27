import ContactInformation from "./ContactInformation";
import ResidentialAddress from "./ResidentialAddress";

export default function ContactComponent() {
  return (
    <div className="">
      <div className="grid gap-4">
        <div className="">
          <ContactInformation />
        </div>
        <div className="">
          <ResidentialAddress />
        </div>
      </div>
    </div>
  );
}
