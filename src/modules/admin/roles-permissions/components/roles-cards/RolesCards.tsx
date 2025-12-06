'use client'
import { Input } from "@heroui/react"
import { CardItem } from "./CardItem"
import { CardNew } from "./CardNew"
import { AddModal } from "../add-modal/AddModal"


export const RolesCards = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <Input className="max-w-[400px]" label="Buscar" radius="full" placeholder="Buscar rol" type="text" variant="bordered" labelPlacement="inside" />
        <AddModal />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardNew />
      </div>
    </div>
  )
}
