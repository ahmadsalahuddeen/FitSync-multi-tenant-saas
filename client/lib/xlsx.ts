import xlsx, { IJsonSheet } from 'json-as-xlsx'

export function downloadToExcel(data: any){

let columns: IJsonSheet[] = [
  {
    sheet: 'Staffs',
    columns: [
      {label: "PersonId", value: 'id'},
      {label: "name", value: 'name'},
      {label: "email", value: 'email'},
      {label: "role", value: 'role'},
      {label: "status", value: 'isActive'},

    ],
    content: data

  }
]
let settings = {
  fileName: 'Staff Excel'
}
xlsx(columns, settings)
}