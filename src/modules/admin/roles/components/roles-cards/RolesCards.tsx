'use client'
import { CardItem } from "./CardItem"
import { CardNew } from "./CardNew"
import { Role } from "@/modules/admin/roles"

interface Props {
  roles: Role[];
}

export const RolesCards = ({ roles }: Props) => {
  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {
        roles.map(role => (
          <CardItem key={role.id} role={role}/>
        ))
      }
      <CardNew />
    </div>
  )
}
