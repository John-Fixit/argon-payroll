export const API_URL = {
    getProfile: "profile/get_profile",
    getHospital: "profile/get_hospital",
    getPaySlip: "profile/get_payslip",
    getAcademics: "profile/get_academics",
    getCertificate: "profile/get_certificates",
    getExperience: "profile/get_experience",
    getProfession: "profile/get_profession",

    getBlood_group: "package/get_blood_group/1",
    get_pension: "package/get_pension",

    getFamily: "profile/get_family",
    getHospitalReview: "profile/get_hospital_review",
    get_documents: "profile/loadDocuments",
    view_profile: "profile/view_profile",
    update_attachment: "profile/update_attachment",
    staff_reset_password: "/profile/reset_password",
    admin_reset_staff_password: "/admin/reset_staff_password",



    set_institution: "package/set_institution",
    set_course: "package/set_course",
    set_degree: "package/set_degree",
    set_certification: "package/set_certification",
    set_certification_authority: "package/set_certification_authority",
    set_organisation: "package/set_organisation",
    set_organisation_designation: "package/set_organisation_designation",
    set_profession_body: "package/set_professional_body",




    //admin atff_details
    get_staff_details: "/admin/staff",


    //leave api_url
    leave_statistics: "leave/leave_statistics",




    //reports api
    generateReport: "/report/get_report",



    //onboard
    create_onboard: "onboard/create",
    onboard_draft: "onboard/draft",
    get_onboard_requests: "onboard/", // they will be adding the type of request to the end of the url
    convert_onboard: "onboard/convert",
    recreate_onboard: "onboard/recreate_onboard",

    //exit
    get_reason: "package/get_exit_reason",
    create_exit: "exits/create",
    get_exit_requests: "exits/", // they will be adding the type of request to the end of the url

}