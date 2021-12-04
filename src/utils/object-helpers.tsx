import React from 'react';
import {UserType} from "../redux/types";


export const updateObjectInArray = (items: Array<UserType>, userId: number,obj:keyof UserType, newObj:Partial<UserType>) => {
  return   items.map(el => el[obj] === userId ? {...el, ...newObj} : el)
}



