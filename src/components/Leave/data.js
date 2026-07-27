import { FaHouseMedical } from "react-icons/fa6";
import { GiTeamIdea } from "react-icons/gi";
import { MdOutlineReviews } from "react-icons/md";
import { TbBuildingMonument } from "react-icons/tb";

// const staff = [
//   {
//     profile_image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmURjNWc5I_ZPQ5oeOt9_ORibdIrpdZf-lQ&usqp=CAU",
//     label: "Adeoye John",
//     value: "Adeoye John",
//     role: "Section Head",
//     abbr: "SH",
//     main: false,
//   },
//   {
//     profile_image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_wufnbZqmr8QYd5Q5UjFgDkmizutxojyTWg&usqp=CAU",
//     label: "Olaitan Okunade",
//     value: "Olaitan Okunade",
//     role: "Team Lead",
//     abbr: "TL",
//     main: false,
//   },
//   {
//     profile_image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUYWK2ER12rKqvZmJGKNgZRGPu_kTwXxHBg&usqp=CAU",
//     label: "Stephen Alagbe",
//     value: "Stephen Alagbe",
//     role: "Section Head",
//     abbr: "SH",
//     main: false,
//   },
//   {
//     profile_image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVus6O1IqRwbOBSl91PWQ5biucI0mRvP0tit_2hoxeqVYrPZtgzN7X7uvrgeVT1TCJ81o&usqp=CAU",
//     label: "Kayode Adeyinka",
//     value: "Kayode Adeyinka",
//     role: "Head of Department",
//     abbr: "HD",
//     main: false,
//   },
//   {
//     profile_image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAFCQIxLqrUR2InTM_dPyFHaz15V14TieeEQ&usqp=CAU",
//     label: "Adeyemi Aderinto",
//     value: "Adeyemi Aderinto",
//     role: "Section Head",
//     abbr: "SH",
//     main: false,
//   },
//   {
//     profile_image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRg5TP-yP_vIZyoSrfDAsiMULomrx4NOWOhw&usqp=CAU",
//     label: "Emmanuel Oluwatayese",
//     value: "Emmanuel Oluwatayese",
//     role: "Team Lead",
//     abbr: "TL",
//     main: false,
//   },
// ];

// Leave history
export const tableData = [
  {
    _id: 1,
    type: "Casual",
    from: "Sat Mar 04 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Sat Mar 04 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "7",
    reason: "Family",
    status: "approved",
    hand_over: {
      profile_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAFCQIxLqrUR2InTM_dPyFHaz15V14TieeEQ&usqp=CAU",
      label: "Adeyemi Aderinto",
      value: "Adeyemi Aderinto",
      role: "Section Head",
      abbr: "SH",
      main: false,
    },
    approvals: {
      internal_approval: [
        {
          approval_status: "approved",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRg5TP-yP_vIZyoSrfDAsiMULomrx4NOWOhw&usqp=CAU",
          label: "Emmanuel Oluwatayese",
          value: "Emmanuel Oluwatayese",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          approval_status: "pending",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmURjNWc5I_ZPQ5oeOt9_ORibdIrpdZf-lQ&usqp=CAU",
          label: "Adeoye John",
          value: "Adeoye John",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
      ],
      hr_approval: [
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_wufnbZqmr8QYd5Q5UjFgDkmizutxojyTWg&usqp=CAU",
          label: "Olaitan Okunade",
          value: "Olaitan Okunade",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVus6O1IqRwbOBSl91PWQ5biucI0mRvP0tit_2hoxeqVYrPZtgzN7X7uvrgeVT1TCJ81o&usqp=CAU",
          label: "Kayode Adeyinka",
          value: "Kayode Adeyinka",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
    },
  },
  {
    _id: 2,
    type: "Casual",
    from: "Wed May 03 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Wed May 03 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "5",
    reason: "Family",
    status: "pending",
    hand_over: {
      profile_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAFCQIxLqrUR2InTM_dPyFHaz15V14TieeEQ&usqp=CAU",
      label: "Adeyemi Aderinto",
      value: "Adeyemi Aderinto",
      role: "Section Head",
      abbr: "SH",
      main: false,
    },
    approvals: {
      internal_approval: [
        {
          approval_status: "approved",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRg5TP-yP_vIZyoSrfDAsiMULomrx4NOWOhw&usqp=CAU",
          label: "Emmanuel Oluwatayese",
          value: "Emmanuel Oluwatayese",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          approval_status: "pending",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmURjNWc5I_ZPQ5oeOt9_ORibdIrpdZf-lQ&usqp=CAU",
          label: "Adeoye John",
          value: "Adeoye John",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
      ],
      hr_approval: [
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_wufnbZqmr8QYd5Q5UjFgDkmizutxojyTWg&usqp=CAU",
          label: "Olaitan Okunade",
          value: "Olaitan Okunade",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVus6O1IqRwbOBSl91PWQ5biucI0mRvP0tit_2hoxeqVYrPZtgzN7X7uvrgeVT1TCJ81o&usqp=CAU",
          label: "Kayode Adeyinka",
          value: "Kayode Adeyinka",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
    },
  },
  {
    _id: 3,
    type: "Casual",
    from: "Wed Mar 01 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Wed Mar 01 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "5",
    reason: "Family",
    status: "declined",
    hand_over: {
      profile_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAFCQIxLqrUR2InTM_dPyFHaz15V14TieeEQ&usqp=CAU",
      label: "Adeyemi Aderinto",
      value: "Adeyemi Aderinto",
      role: "Section Head",
      abbr: "SH",
      main: false,
    },
    approvals: {
      internal_approval: [
        {
          approval_status: "approved",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRg5TP-yP_vIZyoSrfDAsiMULomrx4NOWOhw&usqp=CAU",
          label: "Emmanuel Oluwatayese",
          value: "Emmanuel Oluwatayese",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          approval_status: "pending",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmURjNWc5I_ZPQ5oeOt9_ORibdIrpdZf-lQ&usqp=CAU",
          label: "Adeoye John",
          value: "Adeoye John",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
      ],
      hr_approval: [
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_wufnbZqmr8QYd5Q5UjFgDkmizutxojyTWg&usqp=CAU",
          label: "Olaitan Okunade",
          value: "Olaitan Okunade",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVus6O1IqRwbOBSl91PWQ5biucI0mRvP0tit_2hoxeqVYrPZtgzN7X7uvrgeVT1TCJ81o&usqp=CAU",
          label: "Kayode Adeyinka",
          value: "Kayode Adeyinka",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
    },
  },
  {
    _id: 4,
    type: "Annual",
    from: "Fri Jun 02 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Fri Jun 02 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "15",
    reason: "Personal",
    status: "approved",
    hand_over: {
      name: "Ajayi Adeosun",
      role: "Section Head",
      abbr: "SH",
      main: false,
    },
    approvals: {
      internal_approval: [
        {
          approval_status: "approved",
          name: "Emmanuel Oluwatayese",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
        {
          name: "Adeoye John",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
      hr_approval: [
        {
          name: "Olaitan Okunade",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
        {
          name: "Kayode Adeyinka",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
    },
  },
  {
    _id: 5,
    type: "Annual",
    from: "Mon Sep 04 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Mon Sep 04 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "15",
    reason: "Personal",
    status: "declined",
    hand_over: {
      name: "Ajayi Adeosun",
      role: "Section Head",
      abbr: "SH",
      main: false,
    },
    approvals: {
      internal_approval: [
        {
          approval_status: "approved",
          name: "Emmanuel Oluwatayese",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
        {
          name: "Adeoye John",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
      hr_approval: [
        {
          name: "Olaitan Okunade",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
        {
          name: "Kayode Adeyinka",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
    },
  },
  {
    _id: 6,
    type: "Annual",
    from: "Thu Nov 09 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Thu Nov 09 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "21",
    reason: "Personal",
    status: "pending",
    hand_over: {
      name: "Ajayi Adeosun",
      role: "Section Head",
      abbr: "SH",
      main: false,
    },
    approvals: {
      internal_approval: [
        {
          approval_status: "approved",
          name: "Emmanuel Oluwatayese",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
        {
          name: "Adeoye John",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
      hr_approval: [
        {
          name: "Olaitan Okunade",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
        {
          name: "Kayode Adeyinka",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
    },
  },
  {
    _id: 6,
    type: "Annual",
    from: "Thu Nov 09 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Thu Nov 09 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "21",
    reason: "Personal",
    status: "completed",
    hand_over: {
      name: "Ajayi Adeosun",
      role: "Section Head",
      abbr: "SH",
      main: false,
    },
    approvals: {
      internal_approval: [
        {
          approval_status: "approved",
          name: "Emmanuel Oluwatayese",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
        {
          name: "Adeoye John",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
      hr_approval: [
        {
          name: "Olaitan Okunade",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
        {
          name: "Kayode Adeyinka",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
    },
  },
  {
    _id: 8,
    type: "Maternity",
    from: "Sun Oct 08 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Sun Oct 08 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "40",
    reason: "Business",
    status: "approved",
    hand_over: {
      name: "Ajayi Adeosun",
      role: "Section Head",
      abbr: "SH",
      main: false,
    },
    approvals: {
      internal_approval: [
        {
          approval_status: "approved",
          name: "Emmanuel Oluwatayese",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
        {
          name: "Adeoye John",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
      hr_approval: [
        {
          name: "Olaitan Okunade",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
        {
          name: "Kayode Adeyinka",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
    },
  },
  {
    _id: 9,
    type: "Compassionate",
    from: "Sun Nov 05 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Sun Nov 05 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "10",
    reason: "Personal",
    status: "declined",
    hand_over: {
      name: "Ajayi Adeosun",
      role: "Section Head",
      abbr: "SH",
      main: false,
    },
    approvals: {
      internal_approval: [
        {
          approval_status: "approved",
          name: "Emmanuel Oluwatayese",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
        {
          name: "Adeoye John",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
      hr_approval: [
        {
          name: "Olaitan Okunade",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
        {
          name: "Kayode Adeyinka",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
    },
  },
  {
    _id: 11,
    type: "Medical",
    from: "Fri Dec 15 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Fri Dec 15 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "4",
    reason: "Personal",
    status: "pending",
    hand_over: {
      profile_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAFCQIxLqrUR2InTM_dPyFHaz15V14TieeEQ&usqp=CAU",
      label: "Adeyemi Aderinto",
      value: "Adeyemi Aderinto",
      role: "Section Head",
      abbr: "SH",
      main: false,
    },
    approvals: {
      internal_approval: [
        {
          approval_status: "approved",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRg5TP-yP_vIZyoSrfDAsiMULomrx4NOWOhw&usqp=CAU",
          label: "Emmanuel Oluwatayese",
          value: "Emmanuel Oluwatayese",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          approval_status: "pending",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmURjNWc5I_ZPQ5oeOt9_ORibdIrpdZf-lQ&usqp=CAU",
          label: "Adeoye John",
          value: "Adeoye John",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
      ],
      hr_approval: [
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_wufnbZqmr8QYd5Q5UjFgDkmizutxojyTWg&usqp=CAU",
          label: "Olaitan Okunade",
          value: "Olaitan Okunade",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVus6O1IqRwbOBSl91PWQ5biucI0mRvP0tit_2hoxeqVYrPZtgzN7X7uvrgeVT1TCJ81o&usqp=CAU",
          label: "Kayode Adeyinka",
          value: "Kayode Adeyinka",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
    },
  },
  {
    _id: 11,
    type: "Medical",
    from: "Fri Dec 15 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Fri Dec 15 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "4",
    reason: "Personal",
    status: "completed",
    hand_over: {
      profile_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAFCQIxLqrUR2InTM_dPyFHaz15V14TieeEQ&usqp=CAU",
      label: "Adeyemi Aderinto",
      value: "Adeyemi Aderinto",
      role: "Section Head",
      abbr: "SH",
      main: false,
    },
    approvals: {
      internal_approval: [
        {
          approval_status: "approved",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRg5TP-yP_vIZyoSrfDAsiMULomrx4NOWOhw&usqp=CAU",
          label: "Emmanuel Oluwatayese",
          value: "Emmanuel Oluwatayese",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          approval_status: "pending",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmURjNWc5I_ZPQ5oeOt9_ORibdIrpdZf-lQ&usqp=CAU",
          label: "Adeoye John",
          value: "Adeoye John",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
      ],
      hr_approval: [
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_wufnbZqmr8QYd5Q5UjFgDkmizutxojyTWg&usqp=CAU",
          label: "Olaitan Okunade",
          value: "Olaitan Okunade",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVus6O1IqRwbOBSl91PWQ5biucI0mRvP0tit_2hoxeqVYrPZtgzN7X7uvrgeVT1TCJ81o&usqp=CAU",
          label: "Kayode Adeyinka",
          value: "Kayode Adeyinka",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
    },
  },
  {
    _id: 12,
    type: "Casual",
    from: "Sun Oct 08 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Sun Oct 08 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "40",
    reason: "Personal",
    status: "declined",
    hand_over: {
      name: "Ajayi Adeosun",
      role: "Section Head",
      abbr: "SH",
      main: false,
    },
    approvals: {
      internal_approval: [
        {
          approval_status: "approved",
          name: "Emmanuel Oluwatayese",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
        {
          name: "Adeoye John",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
      hr_approval: [
        {
          name: "Olaitan Okunade",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
        {
          name: "Kayode Adeyinka",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
    },
  },
  {
    _id: 14,
    type: "Casual",
    from: "Sat Mar 04 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Sat Mar 11 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "7",
    reason: "Family",
    status: "completed",
    hand_over: {
      name: "Ajayi Adeosun",
      role: "Section Head",
      abbr: "SH",
      main: false,
    },
    approvals: {
      internal_approval: [
        {
          approval_status: "approved",
          name: "Emmanuel Oluwatayese",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
        {
          name: "Adeoye John",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
      hr_approval: [
        {
          name: "Olaitan Okunade",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
        {
          name: "Kayode Adeyinka",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
    },
  },
  {
    _id: 15,
    type: "Annual",
    from: "Fri Jun 02 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Sat Jun 17 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "15",
    reason: "Personal",
    status: "completed",
    hand_over: {
      name: "Ajayi Adeosun",
      role: "Section Head",
      abbr: "SH",
      main: false,
    },
    approvals: {
      internal_approval: [
        {
          approval_status: "approved",
          name: "Emmanuel Oluwatayese",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
        {
          name: "Adeoye John",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
      hr_approval: [
        {
          name: "Olaitan Okunade",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
        {
          name: "Kayode Adeyinka",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
    },
  },
  {
    _id: 16,
    type: "Casual",
    from: "Sun Oct 08 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Sat Nov 18 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "40",
    reason: "Personal",
    status: "completed",
    hand_over: {
      profile_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAFCQIxLqrUR2InTM_dPyFHaz15V14TieeEQ&usqp=CAU",
      label: "Adeyemi Aderinto",
      value: "Adeyemi Aderinto",
      role: "Section Head",
      abbr: "SH",
      main: false,
    },
    approvals: {
      internal_approval: [
        {
          approval_status: "approved",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRg5TP-yP_vIZyoSrfDAsiMULomrx4NOWOhw&usqp=CAU",
          label: "Emmanuel Oluwatayese",
          value: "Emmanuel Oluwatayese",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          approval_status: "pending",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmURjNWc5I_ZPQ5oeOt9_ORibdIrpdZf-lQ&usqp=CAU",
          label: "Adeoye John",
          value: "Adeoye John",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
      ],
      hr_approval: [
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_wufnbZqmr8QYd5Q5UjFgDkmizutxojyTWg&usqp=CAU",
          label: "Olaitan Okunade",
          value: "Olaitan Okunade",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVus6O1IqRwbOBSl91PWQ5biucI0mRvP0tit_2hoxeqVYrPZtgzN7X7uvrgeVT1TCJ81o&usqp=CAU",
          label: "Kayode Adeyinka",
          value: "Kayode Adeyinka",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
    },
  },
  {
    _id: 16,
    type: "Casual",
    from: "Sun Oct 08 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Sat Nov 18 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "40",
    reason: "Personal",
    status: "completed",
    hand_over: {
      profile_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAFCQIxLqrUR2InTM_dPyFHaz15V14TieeEQ&usqp=CAU",
      label: "Adeyemi Aderinto",
      value: "Adeyemi Aderinto",
      role: "Section Head",
      abbr: "SH",
      main: false,
    },
    approvals: {
      internal_approval: [
        {
          approval_status: "approved",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRg5TP-yP_vIZyoSrfDAsiMULomrx4NOWOhw&usqp=CAU",
          label: "Emmanuel Oluwatayese",
          value: "Emmanuel Oluwatayese",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          approval_status: "pending",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmURjNWc5I_ZPQ5oeOt9_ORibdIrpdZf-lQ&usqp=CAU",
          label: "Adeoye John",
          value: "Adeoye John",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
      ],
      hr_approval: [
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_wufnbZqmr8QYd5Q5UjFgDkmizutxojyTWg&usqp=CAU",
          label: "Olaitan Okunade",
          value: "Olaitan Okunade",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVus6O1IqRwbOBSl91PWQ5biucI0mRvP0tit_2hoxeqVYrPZtgzN7X7uvrgeVT1TCJ81o&usqp=CAU",
          label: "Kayode Adeyinka",
          value: "Kayode Adeyinka",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
    },
  },
  {
    _id: 17,
    type: "Maternity",
    from: "Sun Nov 05 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Sun Nov 05 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "40",
    reason: "Personal",
    status: "completed",
    hand_over: {
      profile_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAFCQIxLqrUR2InTM_dPyFHaz15V14TieeEQ&usqp=CAU",
      label: "Adeyemi Aderinto",
      value: "Adeyemi Aderinto",
      role: "Section Head",
      abbr: "SH",
      main: false,
    },
    approvals: {
      internal_approval: [
        {
          approval_status: "approved",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRg5TP-yP_vIZyoSrfDAsiMULomrx4NOWOhw&usqp=CAU",
          label: "Emmanuel Oluwatayese",
          value: "Emmanuel Oluwatayese",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          approval_status: "pending",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmURjNWc5I_ZPQ5oeOt9_ORibdIrpdZf-lQ&usqp=CAU",
          label: "Adeoye John",
          value: "Adeoye John",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
      ],
      hr_approval: [
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_wufnbZqmr8QYd5Q5UjFgDkmizutxojyTWg&usqp=CAU",
          label: "Olaitan Okunade",
          value: "Olaitan Okunade",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVus6O1IqRwbOBSl91PWQ5biucI0mRvP0tit_2hoxeqVYrPZtgzN7X7uvrgeVT1TCJ81o&usqp=CAU",
          label: "Kayode Adeyinka",
          value: "Kayode Adeyinka",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
    },
  },
];
// Return history
export const returnTableData = [
  {
    _id: 1,
    type: "Casual",
    from: "Sat Mar 04 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Sat Mar 11 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    returned_on:
      "Mon Mar 13 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "9",
    reason: "Family",
    over_shoot: "2",
    status: "approved",
    hand_over: {
      profile_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAFCQIxLqrUR2InTM_dPyFHaz15V14TieeEQ&usqp=CAU",
      label: "Adeyemi Aderinto",
      value: "Adeyemi Aderinto",
      role: "Section Head",
      abbr: "SH",
      main: false,
    },
    approvals: {
      internal_approval: [
        {
          approval_status: "approved",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRg5TP-yP_vIZyoSrfDAsiMULomrx4NOWOhw&usqp=CAU",
          label: "Emmanuel Oluwatayese",
          value: "Emmanuel Oluwatayese",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          approval_status: "pending",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmURjNWc5I_ZPQ5oeOt9_ORibdIrpdZf-lQ&usqp=CAU",
          label: "Adeoye John",
          value: "Adeoye John",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
      ],
      hr_approval: [
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_wufnbZqmr8QYd5Q5UjFgDkmizutxojyTWg&usqp=CAU",
          label: "Olaitan Okunade",
          value: "Olaitan Okunade",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVus6O1IqRwbOBSl91PWQ5biucI0mRvP0tit_2hoxeqVYrPZtgzN7X7uvrgeVT1TCJ81o&usqp=CAU",
          label: "Kayode Adeyinka",
          value: "Kayode Adeyinka",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
    },
  },
  {
    _id: 2,
    type: "Annual",
    from: "Fri Jun 02 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Sat Jun 17 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    returned_on:
      "Sat Jun 17 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "15",
    reason: "Personal",
    over_shoot: "0",
    status: "pending",
    hand_over: {
      profile_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAFCQIxLqrUR2InTM_dPyFHaz15V14TieeEQ&usqp=CAU",
      label: "Adeyemi Aderinto",
      value: "Adeyemi Aderinto",
      role: "Section Head",
      abbr: "SH",
      main: false,
    },
    approvals: {
      internal_approval: [
        {
          approval_status: "approved",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRg5TP-yP_vIZyoSrfDAsiMULomrx4NOWOhw&usqp=CAU",
          label: "Emmanuel Oluwatayese",
          value: "Emmanuel Oluwatayese",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          approval_status: "pending",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmURjNWc5I_ZPQ5oeOt9_ORibdIrpdZf-lQ&usqp=CAU",
          label: "Adeoye John",
          value: "Adeoye John",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
      ],
      hr_approval: [
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_wufnbZqmr8QYd5Q5UjFgDkmizutxojyTWg&usqp=CAU",
          label: "Olaitan Okunade",
          value: "Olaitan Okunade",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVus6O1IqRwbOBSl91PWQ5biucI0mRvP0tit_2hoxeqVYrPZtgzN7X7uvrgeVT1TCJ81o&usqp=CAU",
          label: "Kayode Adeyinka",
          value: "Kayode Adeyinka",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
    },
  },
  {
    _id: 3,
    type: "Casual",
    from: "Sun Oct 08 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Sat Nov 18 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    returned_on:
      "Thu Jun 15 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "37",
    reason: "Personal",
    over_shoot: "-3",
    status: "approved",
    hand_over: {
      profile_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAFCQIxLqrUR2InTM_dPyFHaz15V14TieeEQ&usqp=CAU",
      label: "Adeyemi Aderinto",
      value: "Adeyemi Aderinto",
      role: "Section Head",
      abbr: "SH",
      main: false,
    },
    approvals: {
      internal_approval: [
        {
          approval_status: "approved",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRg5TP-yP_vIZyoSrfDAsiMULomrx4NOWOhw&usqp=CAU",
          label: "Emmanuel Oluwatayese",
          value: "Emmanuel Oluwatayese",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          approval_status: "pending",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmURjNWc5I_ZPQ5oeOt9_ORibdIrpdZf-lQ&usqp=CAU",
          label: "Adeoye John",
          value: "Adeoye John",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
      ],
      hr_approval: [
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_wufnbZqmr8QYd5Q5UjFgDkmizutxojyTWg&usqp=CAU",
          label: "Olaitan Okunade",
          value: "Olaitan Okunade",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVus6O1IqRwbOBSl91PWQ5biucI0mRvP0tit_2hoxeqVYrPZtgzN7X7uvrgeVT1TCJ81o&usqp=CAU",
          label: "Kayode Adeyinka",
          value: "Kayode Adeyinka",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
    },
  },
  {
    _id: 1,
    type: "Casual",
    from: "Sat Mar 04 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Sat Mar 11 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    returned_on:
      "Mon Mar 13 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "9",
    reason: "Family",
    over_shoot: "2",
    status: "pending",
    hand_over: {
      profile_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAFCQIxLqrUR2InTM_dPyFHaz15V14TieeEQ&usqp=CAU",
      label: "Adeyemi Aderinto",
      value: "Adeyemi Aderinto",
      role: "Section Head",
      abbr: "SH",
      main: false,
    },
    approvals: {
      internal_approval: [
        {
          approval_status: "approved",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRg5TP-yP_vIZyoSrfDAsiMULomrx4NOWOhw&usqp=CAU",
          label: "Emmanuel Oluwatayese",
          value: "Emmanuel Oluwatayese",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          approval_status: "pending",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmURjNWc5I_ZPQ5oeOt9_ORibdIrpdZf-lQ&usqp=CAU",
          label: "Adeoye John",
          value: "Adeoye John",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
      ],
      hr_approval: [
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_wufnbZqmr8QYd5Q5UjFgDkmizutxojyTWg&usqp=CAU",
          label: "Olaitan Okunade",
          value: "Olaitan Okunade",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVus6O1IqRwbOBSl91PWQ5biucI0mRvP0tit_2hoxeqVYrPZtgzN7X7uvrgeVT1TCJ81o&usqp=CAU",
          label: "Kayode Adeyinka",
          value: "Kayode Adeyinka",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
    },
  },
  {
    _id: 2,
    type: "Annual",
    from: "Fri Jun 02 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Sat Jun 17 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    returned_on:
      "Sat Jun 17 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "15",
    reason: "Personal",
    over_shoot: "0",
    status: "approved",
    hand_over: {
      profile_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAFCQIxLqrUR2InTM_dPyFHaz15V14TieeEQ&usqp=CAU",
      label: "Adeyemi Aderinto",
      value: "Adeyemi Aderinto",
      role: "Section Head",
      abbr: "SH",
      main: false,
    },
    approvals: {
      internal_approval: [
        {
          approval_status: "approved",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRg5TP-yP_vIZyoSrfDAsiMULomrx4NOWOhw&usqp=CAU",
          label: "Emmanuel Oluwatayese",
          value: "Emmanuel Oluwatayese",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          approval_status: "pending",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmURjNWc5I_ZPQ5oeOt9_ORibdIrpdZf-lQ&usqp=CAU",
          label: "Adeoye John",
          value: "Adeoye John",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
      ],
      hr_approval: [
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_wufnbZqmr8QYd5Q5UjFgDkmizutxojyTWg&usqp=CAU",
          label: "Olaitan Okunade",
          value: "Olaitan Okunade",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVus6O1IqRwbOBSl91PWQ5biucI0mRvP0tit_2hoxeqVYrPZtgzN7X7uvrgeVT1TCJ81o&usqp=CAU",
          label: "Kayode Adeyinka",
          value: "Kayode Adeyinka",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
    },
  },
  {
    _id: 3,
    type: "Casual",
    from: "Sun Oct 08 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Sat Nov 18 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    returned_on:
      "Thu Jun 15 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "37",
    reason: "Personal",
    over_shoot: "-3",
    status: "pending",
    hand_over: {
      profile_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAFCQIxLqrUR2InTM_dPyFHaz15V14TieeEQ&usqp=CAU",
      label: "Adeyemi Aderinto",
      value: "Adeyemi Aderinto",
      role: "Section Head",
      abbr: "SH",
      main: false,
    },
    approvals: {
      internal_approval: [
        {
          approval_status: "approved",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRg5TP-yP_vIZyoSrfDAsiMULomrx4NOWOhw&usqp=CAU",
          label: "Emmanuel Oluwatayese",
          value: "Emmanuel Oluwatayese",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          approval_status: "pending",
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmURjNWc5I_ZPQ5oeOt9_ORibdIrpdZf-lQ&usqp=CAU",
          label: "Adeoye John",
          value: "Adeoye John",
          role: "Section Head",
          abbr: "SH",
          main: false,
        },
      ],
      hr_approval: [
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_wufnbZqmr8QYd5Q5UjFgDkmizutxojyTWg&usqp=CAU",
          label: "Olaitan Okunade",
          value: "Olaitan Okunade",
          role: "Team Lead",
          abbr: "TL",
          main: false,
        },
        {
          profile_image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVus6O1IqRwbOBSl91PWQ5biucI0mRvP0tit_2hoxeqVYrPZtgzN7X7uvrgeVT1TCJ81o&usqp=CAU",
          label: "Kayode Adeyinka",
          value: "Kayode Adeyinka",
          role: "Head of Department",
          abbr: "HD",
          main: false,
        },
      ],
    },
  },
];

export const columns = [
  { name: "ID", uid: "REQUEST_ID", sortable: true },
  { name: "SN", uid: "S_N", sortable: true },
  { name: "TYPE", uid: "LEAVE_NAME", sortable: true },
  { name: "START DATE", uid: "START_DATE", sortable: true },
  { name: "END DATE", uid: "END_DATE", sortable: true },
  { name: "DURATION(DAYS)", uid: "DURATION", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  // { name: "REASON", uid: "reason", sortable: true },
  // { name: "HANDED OVER TO", uid: "approval", sortable: true },
  { name: "ACTIONS", uid: "ACTIONS" },
];
export const returnColumns = [
  { name: "ID", uid: "_id", sortable: true },
  { name: "TYPE", uid: "type", sortable: true },
  { name: "START DATE", uid: "from", sortable: true },
  { name: "END DATE", uid: "to", sortable: true },
  { name: "DATE RETURNED", uid: "returned_on", sortable: true },
  { name: "DURATION (DAYS)", uid: "duration", sortable: true },
  { name: "OVER SHOOT (DAYS)", uid: "over_shoot", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "HANDED OVER TO", uid: "approval", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const status = [
  { name: "approved", uid: "approved" },
  { name: "pending", uid: "pending" },
  { name: "declined", uid: "declined" },
];

export const statusColor = {
  approved: "success",
  declined: "danger",
  pending: "warning",
};

export const tableHeader = [
  "LEAVE_NAME",
  "START_DATE",
  // "SELECTED_DATES",
  "RESUMPTION_DATE",
  "STATUS",
  "DAYS_EXCEEDED",
  "END_DATE",
  "DURATION",
  "LEAVE ADVICE",
  "ACTIONS",
];
export const returnTableHeader = [
  "type",
  "from",
  "to",
  "returned_on",
  "duration",
  "over_shoot",
  "actions",
];

export const leaveHistory = [
  {
    type: "Annual Leaves",
    no_of_leave: 6,
    icon: MdOutlineReviews,
    b_color: "bg-amber-100",
    t_color: "text-amber-500",
  },
  {
    type: "Medical Leaves",
    no_of_leave: 3,
    icon: FaHouseMedical,
    b_color: "bg-red-100",
    t_color: "text-red-500",
  },
  {
    type: "Other Leaves",
    no_of_leave: 8,
    icon: TbBuildingMonument,
    b_color: "bg-green-100",
    t_color: "text-green-500",
  },
  {
    type: "Remaining Leaves",
    no_of_leave: 2,
    icon: GiTeamIdea,
    b_color: "bg-purple-100",
    t_color: "text-purple-500",
  },
];

// leave forms data
export const options = [
  { value: "Annual", label: "Annual", color: "blue" },
  { value: "Casual", label: "Casual", color: "blue" },
  { value: "Compassionate", label: "Compassionate", color: "red" },
  { value: "Emergency", label: "Emergency", color: "yellow" },
  { value: "Maternity", label: "Maternity", color: "green" },
  { value: "Paternity", label: "Paternity", color: "purple" },
  { value: "Annual Leave 1-3", label: "Annual Leave 1-3", color: "green" },
  { value: "Sick Leave", label: "Sick Leave", color: "green" },
  { value: "Academics", label: "Academics", color: "purple" },
];
export const reasons = [
  { value: "Personal", label: "Personal", color: "blue" },
  { value: "Business", label: "Business", color: "red" },
  { value: "Family", label: "Family", color: "yellow" },
];

// Approval form
export const aprrovalRoles = [
  { value: "Section Head", label: "Section Head" },
  { value: "Team Lead", label: "Team Lead" },
  { value: "Head of Department", label: "Head of Department" },
];
export const staff = [
  { name: "Adeoye John", role: "Section Head", abbr: "SH", main: false },
  { name: "Olaitan Okunade", role: "Team Lead", abbr: "TL", main: false },
  { name: "Stephen Alagbe", role: "Section Head", abbr: "SH", main: false },
  {
    name: "Kayode Adeyinka",
    role: "Head of Department",
    abbr: "HD",
    main: false,
  },
  { name: "Adeyemi Aderinto", role: "Section Head", abbr: "SH", main: false },
  { name: "Emmanuel Oluwatayese", role: "Team Lead", abbr: "TL", main: false },
];

// Events
let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const events = [
  {
    id: createEventId(),
    title: "Intermediate Technician Certificate Course",
    start: "2024-01-01",
    end: "2024-05-20",
  },
  {
    id: createEventId(),
    title: "STANDARD AIR TRAFFIC CONTROL COURSE NO 75",
    start: "2024-01-01",
    end: "2024-05-20",
  },
  {
    id: createEventId(),
    title: "Advance Aeronautical Information Management Officers course",
    start: "2024-01-01",
    end: "2024-05-20",
  },
  {
    id: createEventId(),
    title: "2-day event",
    start: todayStr,
  },
  {
    id: createEventId(),
    title: "All-day event",
    start: todayStr,
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: todayStr + "T12:00:00",
  },
];

export function createEventId() {
  return String(eventGuid++);
}
