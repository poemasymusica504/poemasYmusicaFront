import { FC, useEffect } from "react";
import { Paginator } from "../../infrastructure/context/GlobalPagintator/types";
import { usePaginator } from "../../infrastructure/context/GlobalPagintator/paginator";
import { Pagination } from "antd";

export type CustomPaginatorProps = {
    onShowSizeChange?: () => void
    ModuleName: string
    countOfRecord: number
    paginator: Paginator
};

const CustomPagination: FC<CustomPaginatorProps> = (props) => {
	
	const handleTotalRecords = usePaginator(state=> state.handleTotalRecords);
	const handleNextPage = usePaginator(state=> state.handleNextPage);
  
	useEffect(()=>{
		handleTotalRecords(props.ModuleName, props.countOfRecord);
	}, [props.ModuleName, props.countOfRecord]);

	const handleNextPageWrapper = (e:number)=>{
		handleNextPage(props.ModuleName, e);
	};

	return (
		<Pagination
			simple
			showSizeChanger={false}
			style={{
				textAlign: 'center',
				paddingTop: 24,
			}}
			current={props.paginator.currentPage} 
			onShowSizeChange={props.onShowSizeChange} 
			onChange={handleNextPageWrapper} 
			defaultCurrent={props.paginator.defaultCurrent} 
			total={props.paginator.totalRecords}
		/>
	);
};

export default CustomPagination;