import React, { FC } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { CgRename } from "react-icons/cg";
import { MdOutlineDeleteSweep } from "react-icons/md";
import DropDown from "../../dropdown/DropDown";
import DrpItem from "../../dropdown/DrpItem";
import CollectionContextMenu from "../../contextMenu/CollectionContextMenu";
const CollectionDrpDown: FC<PropsType> = ({ drp_id, uid, collection_id }) => {
  return (
    <DropDown
      label={""}
      drpId={drp_id.toString()}
      styles="bg-primary color-gray absolute z-2 rounded-lg w-150"
    >
      <CollectionContextMenu uid={uid} collection_id={collection_id} />
    </DropDown>
  );
};
type PropsType = {
  drp_id: string | number;
  uid: string;
  collection_id: string;
};
export default CollectionDrpDown;
