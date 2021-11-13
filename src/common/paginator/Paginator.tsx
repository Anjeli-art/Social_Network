import React from 'react';
import s from "./Paginator.module.css";

type PropsTypePaginator={
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

const Paginator: React.FC<PropsTypePaginator> = ({totalUsersCount,pageSize,currentPage,onPageChanged,...props}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            {pages.map(el => {
                return <span className={currentPage === el ? s.pageActive : ""}
                             onClick={(e) => {
                                 onPageChanged(el)
                             }}
                >{el}</span>
            })}
        </div>
    );
};

export default Paginator;