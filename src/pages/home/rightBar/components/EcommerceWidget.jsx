import { useMemo } from "react";
import { useGetProfile } from "../../../../API/profile";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import StarLoader from "../../../../components/core/loaders/StarLoader";

const EcommerceWidget = () => {
  const { userData } = useCurrentUser();
  const { data: profile, isPending } = useGetProfile({
    user: userData?.data,
    path: "/profile/get_profile",
  });

  const userInfo = useMemo(
    () => ({
      name:
        `${profile?.BIODATA?.LAST_NAME} ${profile?.BIODATA?.FIRST_NAME}` || "",
      email: profile?.CONTACT_INFORMATION?.EMAIL || "",
      phone: profile?.CONTACT_INFORMATION?.PHONE || "",
      address: profile?.RESIDENTIAL_INFORMATION?.HOME_ADDRESS || "",
    }),
    [profile]
  );

  const url = new URL("https://commerce-widget.netlify.app/");
  url.searchParams.set(
    "apiKey",
    "87d0fe8f16d6455cbb8b10e94251656d0f2a1f144c08ac2a8adafb"
  );
  url.searchParams.set("slug", "ncaa");
  url.searchParams.set("name", userInfo.name);
  url.searchParams.set("email", userInfo.email);
  url.searchParams.set("phone", userInfo.phone);
  url.searchParams.set("address", userInfo.address);

  if (isPending)
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <StarLoader size={40} />
      </div>
    );

  return (
    <iframe
      src={url.toString()}
      style={{ width: "100%", height: "100vh", border: "none" }}
      title="Ecommerce Widget"
    />
  );
};

export default EcommerceWidget;
