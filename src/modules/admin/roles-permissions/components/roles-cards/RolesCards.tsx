'use client'
import { Input } from "@heroui/react"
import { CardItem } from "./CardItem"
import { CardNew } from "./CardNew"
import { AddModal } from "../add-modal/AddModal"


export const RolesCards = () => {
  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      <CardNew />
    </div>
  )
}
