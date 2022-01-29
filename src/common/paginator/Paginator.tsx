import React, {useState} from 'react';
import s from "./Paginator.module.css";
import cn from "classnames"

type PropsTypePaginator = {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

const Paginator: React.FC<PropsTypePaginator> = ({totalUsersCount, pageSize, currentPage, onPageChanged, ...props}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages:Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionSize = 10
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setportionNumber] = useState(1)
    let leftpage = (portionNumber - 1) * portionSize + 1
    let rightpage = portionNumber * portionSize

    return (
        <div className={s.paginator}>
            {portionNumber > 1 && <button onClick={() => {
                setportionNumber(portionNumber - 1)
            }}>prev</button>}

            {pages.filter(el => el >= leftpage && el <= rightpage)
                .map(el => {
                    return <span className={cn({[s.pageActive]: currentPage === el}, s.block)}
                                 key={el}
                                 onClick={(e) => {
                                     onPageChanged(el)
                                 }}
                    >{el}</span>
                })}


            {portionCount > portionNumber && <button onClick={() => {
                setportionNumber(portionNumber + 1)
            }}>next</button>}
        </div>
    );
};

export default Paginator;
