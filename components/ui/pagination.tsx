"use client"

import { Table } from "@tanstack/react-table"
import {ChevronLeft,ChevronRight} from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect } from "react"
import { Button } from "./button"
import LimitSetter from "./limit-setter"
import { getPageNumbers } from "@/lib/utils"

// handle pagination manually if products are being fetched
interface DataTablePaginationProps<TData> {
  table: Table<TData>,
  manualPagination: boolean,
  limit?: number,
}

export function DataTablePagination<TData>({
  table,
  manualPagination,
  limit
}: Readonly<DataTablePaginationProps<TData>>) {
  const searchParams = useSearchParams();
  const router = useRouter()
  const pathname = usePathname()

   const entries = Array.from(searchParams.entries());
       const defaultPage = entries.map(([key, value]) => ({
           filterKey: key,
           filterValue: value,
         })).find((filter)=> filter.filterKey === 'page');
         useEffect(()=> {
          if (defaultPage !== undefined) {
            table.setPageIndex(Number(defaultPage.filterValue)-1)
          } else {
            table.setPageIndex(0)
          }      
         },[])
         

//  get the params on refresh and set number value to that
  const createQueryString = useCallback(
    (value: string | number) => {
      
     if (manualPagination) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', `${value}`)
    router.push(pathname + '?' + params.toString()) 
    }  
    table.setPageIndex(Number(value) -1) 
    console.log(table.getState().pagination.pageSize, 'after creating query string');
    },
    [searchParams, pathname, router, table, manualPagination]
  )

  
  return (
    <div className="flex items-center justify-center gap-5 py-2">
        {/* PREVIOUS */}
        <Button 
        variant="ghost"
        className="flex font-medium text-[.85rem]"
        onClick={() =>{
          table.previousPage()
          createQueryString(table.getState().pagination.pageIndex);   
        }}
        disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
        </Button>

        <div className="flex items-center space-x-2">

          {getPageNumbers(table.getState().pagination.pageIndex + 1, table.getPageCount()).map((page) =>
        page === "..." ? (
          <span key={page} className="px-2">...</span>
        ) : (
        <button
          key={page}
              onClick={() =>{ createQueryString(page); }}
              className={`px-3 py-1 ${
                page === table.getState().pagination.pageIndex +1
                  ? "bg-accent-50 text-primary-blue rounded-sm font-medium"
                  : " text-tertiary-500"
              } hover:bg-accent-75 transition`}
            >
              {page.toString().padStart(2, "0")}
            </button>
          )
        )}
        </div>
        <div className="flex gap-5">
          {
            limit && 
           <LimitSetter limit={limit} /> 
          }
          
           {/* NEXT */}
         <Button 
        variant="ghost"
        className="flex font-medium text-[.85rem]"
        onClick={() =>{ 
          table.nextPage(); 
          createQueryString(table.getState().pagination.pageIndex + 2);      
        }}
        disabled={!table.getCanNextPage()}
        >
            <ChevronRight />
        </Button>

        
        </div>
     
    </div>
  )
}