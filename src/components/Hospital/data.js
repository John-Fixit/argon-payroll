

// Leave history
export const tableData = [
  {
    _id: 1,
    name: "Olarinde Gideon",
    profile_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUYWK2ER12rKqvZmJGKNgZRGPu_kTwXxHBg&usqp=CAU",
    relationship: "Brother",
    hospital: "Reddington Hospital",
    rating_num:88,
    rating:3.2,

  },
  {
    _id: 2,
    name: "Adeyemo Abidemi",
    profile_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_wufnbZqmr8QYd5Q5UjFgDkmizutxojyTWg&usqp=CAU",
    relationship: "Cousin",
    hospital: "Paelon Memorial Hospital",
    rating_num:139,
    rating:4.1
  },
  {
    _id: 3,
    name: "Chukwuemeka Daniel",
    profile_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVus6O1IqRwbOBSl91PWQ5biucI0mRvP0tit_2hoxeqVYrPZtgzN7X7uvrgeVT1TCJ81o&usqp=CAU",
    relationship: "Friend",
    hospital: "Faith City Hospital",
    rating_num:46,
    rating:3.2,
  },
];

export const columns = [
  { name: "ID", uid: "_id", sortable: true },
  // { name: "S/N", uid: "s_n", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "HOSPITAL", uid: "hospital", sortable: true },
  { name: "RATING", uid: "rating", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const status = [
  { name: "active", uid: "active" },
  { name: "inactive", uid: "inactive" },
];

export const statusColor = {
  active: "success",
  inactive: "danger",
};

export const tableHeader = [
  "s_n",
  "name",
  "hospital",
  "rating",
  "duration",
  "actions",
];

export const feedBackComplaint=[
  { label: "Rude Staff",value: "Rude Staff" },
  { label: "Delayed Services",value: "Delayed Services" },
  { label: "Too expensive",value: "Too expensive" },
  { label: "Unavailable Drugs",value: "Unavailable Drugs" },
  { label: "Inexperience Doctors",value: "Inexperience Doctors" },
]
export const patients=[
  { label: "Myself",value: "Myself" },
  { label: "Family",value: "Family" },
]



