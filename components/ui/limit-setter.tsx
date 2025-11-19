import Form from 'next/form';
import React, { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const limits = [
    {id: '10', name: '10', value: '10'},
    {id: '20', name: '20', value: '20'},
    {id: '50', name: '50', value: '50'},
    {id: '100', name: '100', value: '100'},
]

export default function LimitSetter({limit}: Readonly<{limit?: number}>) {
     const searchParams = useSearchParams();
      const router = useRouter()
      const pathname = usePathname()

      const entries = Array.from(searchParams.entries());
       const defaultLimit = entries.map(([key, value]) => ({
           filterKey: key,
           filterValue: value,
         })).find((filter)=> filter.filterKey === 'limit');
 
      const createQueryString = useCallback(
        (value: string | number) => {
          const params = new URLSearchParams(searchParams.toString())
          console.log(params);
          
          params.set('limit', `${value}`)
          console.log(params);
        router.push(pathname + '?' + params.toString()) 
        }  
        , [searchParams, pathname, router])      
         
  return (

    <Form action="" className='flex items-center gap-2 text-sm'>

        <label htmlFor="limit">Show</label>

      <select
        id="limit"
        defaultValue={defaultLimit?.filterValue ?? limit}
        onChange={(e)=> createQueryString(e.target.value)}
        className="border rounded px-2 py-1"
      >
       {

        limits.map((limit)=>
             <option key={limit.id} value={limit.value}>
                {limit.name}
            </option>
            )

       }
      </select>

      <span>products per page</span>
        
        </Form>
  )
}
