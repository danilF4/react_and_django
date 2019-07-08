import React from 'react'

const PaginationCom = ({currentPage, postsPerPage, totalPosts, paginate, toFirstPage, toLastPage }) => {
	const firtPage = '<<'
	const lastPage = '>>'
	const nextPage = '>'
	const previousPage = '<'
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i)
	}

	return (
		<nav>
		  <ul className="pagination">
		    {currentPage !== 1 ? <li><a onClick={() => toLastPage()} href="#">{firtPage}</a></li> : ''}
		    {currentPage !== 1 ? <li><a onClick={() => paginate(currentPage - 1)} href="#">{previousPage}</a></li> : '' }

		    {pageNumbers.map(number => (
		    <li key={number} className="">
		      <a onClick={() => paginate(number)} href="#">
		        {number}
		      </a>
		    </li>
		    ))}

		    {currentPage !== pageNumbers.length && pageNumbers !== 1 ? <li><a onClick={() => paginate(currentPage + 1)} href="#">{nextPage}</a></li> : '' }
		    {currentPage !== pageNumbers.length ? <li><a onClick={() => toLastPage()} href="#">{lastPage}</a></li> : ''}
		  </ul>
		</nav>
	)
}

export default PaginationCom