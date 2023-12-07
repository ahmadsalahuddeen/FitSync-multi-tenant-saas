import { User } from '@/types/next-auth'
import { Staff } from '@/types/types'
import {ColumnDef} from '@tanstack/react-table'


export const columns : ColumnDef<Staff>[] = [
  {
    header: "ID",
    accessorKey : "id"
  },
  {
    header: "Name",
    accessorKey : "name"
  },
  {
    header: "Email",
    accessorKey : "email"
  },
  {
    header: "Role",
    accessorKey : "role"
  },
  {
    header: "Status",
    accessorKey : "isActive"
  }
  
]