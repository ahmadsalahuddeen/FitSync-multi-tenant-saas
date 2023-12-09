'use client'
import { User } from '@/types/next-auth'
import { Staff } from '@/types/types'
import {ColumnDef} from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { roles } from '../data/data'
import { DataTableRowActions } from './data-table-row-actions'


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
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = roles.find(
        (role) => role.value === row.getValue("role")
      )

      if (!role) {
        return null
      }

      return (
        <div className="flex items-center">
          {role.icon && (
            <role.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{role.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    header: "Status",
    accessorKey : "isActive",
    cell: ({row} ) =>{
      const isActive = row.getValue('isActive')
      const label = isActive === true ? 'Active' : 'InActive'
      return label
    },
    
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  }
  
]