const columns = [
    { name: 'ID', uid: 'id', sortable: true },
    { name: 'S/N', uid: 's/n', sortable: true },
    { name: 'NAMe', uid: 'name', sortable: true },
    { name: 'AGe', uid: 'age', sortable: true },
    { name: 'ROLe', uid: 'role', sortable: true },
    { name: 'TEAM', uid: 'team' },
    { name: 'EMAIL', uid: 'email' },
    { name: 'STATUS', uid: 'status', sortable: true },
    { name: 'COMPANY', uid: 'company' },
    { name: 'START DATe', uid: 'start date' },
    { name: 'END DATe', uid: 'end date' },
    { name: 'EMPLOYMENT TYPe', uid: 'EMPLOYMENT TYPE' },
    { name: 'AUDIT REMARK', uid: 'AUDIT REMARK' },
    { name: 'AUDITED BY', uid: 'AUDITED BY' },
    { name: 'APPROVED BY HR', uid: 'APPROVED BY HR' },
    { name: 'AUDIT STATUS', uid: 'AUDIT STATUS' },
    { name: 'HR STATUS', uid: 'HR STATUS' },
    { name: 'CREATED BY', uid: 'CREATED BY' },
    { name: 'DATE ADDED', uid: 'DATE ADDED' },
    { name: 'EMP. NO', uid: 'EMP. NO' },
    { name: 'DAY', uid: 'DAY' },
    { name: 'DATe', uid: 'DATE' },
    { name: 'ACTIONS', uid: 'actions' },
  ]
  

  const statusOptions = [
    { name: 'Active', uid: 'active' },
    { name: 'Paused', uid: 'paused' },
    { name: 'Vacation', uid: 'vacation' },
  ]
  
  
  const data = [
    {
      id: 1,
      name: 'DIRECTOR',
    },
    {
      id: 2,
      name: 'GM(ANS)',
    },
    {
      id: 3,
      name: 'GM(AERODROME ENGINEERING)',
    },
    {
      id: 4,
      name: 'DGM.(FIRE &SAFETY )',
    },
    {
      id: 5,
      name: 'DGM(AE)',
    },
    {
      id: 6,
      name: 'DGM(CNS)',
    },
    {
      id: 7,
      name: 'AVIATION SAFETY INSPECTOR (ANS)',
    },
    {
      id: 8,
      name: 'AERODROME SAFETY INSPECTOR (ATM)',
    },
    {
      id: 9,
      name: 'AERODROME SAFETY INSPECTOR',
    },
    {
      id: 10,
      name: 'AVIATION SAFETY INSPECTOR (ATC)',
    },
    {
      id: 11,
      name: 'DGM(AERODROME ENGINEERING)',
    },
    {
      id: 12,
      name: 'DGM(AIRNAVIGATION )',
    },
   
   
   
   
  ]
  
  export { columns, data, statusOptions }
  