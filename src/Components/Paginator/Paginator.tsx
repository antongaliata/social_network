import ReactPaginate from "react-paginate";
import React from "react";
import './pagination.css'


type paginatorType = {
    getUsersThunk: (pageUsers: number, pageSize: number) => void
    selectedPageUsersAC: (page: number) => void
    quantityPageLength: number
    pageSize: number
    updateSubscribers: ((numberPage: number) => void) | null

}


const Paginator = (props: paginatorType) => {

    return <div className={'pagination_wrapper'}>
        <ReactPaginate
            previousLabel={'«'}
            nextLabel={'»'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={props.quantityPageLength}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={(selectedItem) => {
                props.updateSubscribers && props.updateSubscribers(selectedItem.selected + 1)
                props.getUsersThunk(selectedItem.selected + 1, props.pageSize)
                props.selectedPageUsersAC(selectedItem.selected + 1)
            }}
            containerClassName={'pagination'}
            activeClassName={'active'}
            nextLinkClassName={'next'}
            previousLinkClassName={'prev'}
        />
    </div>
}


export default Paginator;