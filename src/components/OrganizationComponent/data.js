import { GiCompanionCube } from "react-icons/gi";
import { MdOutlineLocalFireDepartment } from "react-icons/md";

export const organizationalData=[
{
    id: "37205b2a-d844-4672-87fc-288b3aa443fd",
    title: "General Manager",
    children: [
      {
        id: "f7881598-3248-4d93-bd23-328d95ed81c1",
        title: "Supervisory Manager",
        children: [
          {
            id: "dbcadfe4-da82-4dff-baeb-82542f960078",
            title: "Account Supervisor 1",
            children: [
              {
                id: "15633faa-e0c7-49ae-987e-9d7c3ce13066",
                title: "Account Executive",
                children: [
                  {
                    id: "d39cfe81-b49d-4487-956b-3ae43c05f7d7",
                    title: "Account Executive",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: "669b13d2-74d0-47b4-9cd3-4891a4b6fbc3",
            title: "Account Supervisor 2",
          },
        ],
      },
      {
        id: "48b26727-01d4-4adf-bd8c-a90b677a997c",
        title: "Creative Media",
        children: [
          {
            id: "876a578e-bd1f-4222-b06a-124a1dc128e2",
            title: "Art/Copy",
            children: [
              {
                id: "519d1b0c-327c-44fb-8f9c-2fb08e4326f9",
                title: "Production",
                children: [
                 
                ],
              },
            ],
          },
        ],
      },
      {
        id: "35e5656c-e25f-4504-8189-ca689a9da1be",
        title: "Marketing Services 1",
        children: [
        {
            id: "b82f2b58-389c-422b-9512-a69b9ff87ce8",
            title: "Media",
            children: [
              {
                id: "8ab706e6-32ab-4092-9c7a-f00cfba6436c",
                title: "Research",
                children: [
                 
                ],
              },
            ],
          },
        ],
      },
      {
        id: "c5bbae1e-aa17-4c0e-b45f-6fb8386c3186",
        title: "Management Services 2",
        // sub_title: "Management Services",
        children: [
          {
            id: "073427ef-95be-46d1-9726-6e2388a3625e",
            title: "Accounting",
            sub_title: "",
            children: [
              {
                id: "2ef8e721-9e6d-4226-9903-194fb249ddc3",
                title: "Purchasing",
                sub_title: "",
                children: [
                  {
                    id: "7e5ab406-668b-4800-8474-4c3b9a4f9e95",
                    title: "Personal",
                    sub_title: "",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
// {
//     id: "parent",
//     title: "President",
//     children: [
//       {
//         id: "child_one",
//         title: "Vice President",
//         sub_title: "Account Service",
//         children: [
//           {
//             id: "grand_child_one",
//             title: "Account Supervisor 1",
//             sub_title: "",
//             children: [
//               {
//                 id: "great_grand_child_one",
//                 title: "Account Executive",
//                 sub_title: "",
//                 children: [
//                   {
//                     id: "descendant_one",
//                     title: "Account Executive",
//                     sub_title: "",
//                     children: [],
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             id: "grand_child",
//             title: "Account Supervisor 2",
//             sub_title: "",
//           },
//         ],
//       },
//       {
//         id: "child_two",
//         title: "Vice President",
//         sub_title: "Creative Services",
//         children: [
//           {
//             id: "grand_child_one",
//             title: "Art/Copy",
//             sub_title: "babyboy",
//             children: [
//               {
//                 id: "great_grand_child_one",
//                 title: "Production",
//                 sub_title: "",
//                 children: [
                 
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: "child_three",
//         title: "Vice President",
//         sub_title: "Marketing Services",
//         children: [
//         {
//             id: "grand_child_one",
//             title: "Media",
//             sub_title: "",
//             children: [
//               {
//                 id: "great_grand_child_one",
//                 title: "Research",
//                 sub_title: "",
//                 children: [
                 
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: "child_four",
//         title: "Vice President",
//         sub_title: "Management Services",
//         children: [
//           {
//             id: "grand_child_one",
//             title: "Accounting",
//             sub_title: "",
//             children: [
//               {
//                 id: "great_grand_child_one",
//                 title: "Purchasing",
//                 sub_title: "",
//                 children: [
//                   {
//                     id: "great_grand_child_one",
//                     title: "Personal",
//                     sub_title: "",
//                     children: [],
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
  ]

  export const tableData = [
  {
    _id: 1,
    department_name: "Web Development",
  },
  {
    _id: 2,
    department_name: "Telecommunication",
  },
  {
    _id: 3,
    department_name: "Media",
  },
  {
    _id: 4,
    department_name: "Telesales",
  },
  {
    _id: 5,
    department_name: "Hr",
  },
];

export const columns = [
  { name: "ID", uid: "_id", sortable: true },
  { name: "S/N", uid: "s_n", sortable: true },
  { name: "DEPARTMENT NAME", uid: "department_name", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];


export const tableHeader = [
  "s_n",
  "department_name",
  "actions",
];

  export const organogramHistory = [
  {
    type: "Company",
    icon: GiCompanionCube,
    b_color: "bg-amber-100",
    t_color: "text-amber-500",
  },
  {
    type: "Department",
    no_of_trees: 5,
    icon: MdOutlineLocalFireDepartment,
    b_color: "bg-green-100",
    t_color: "text-green-500",
  },
];