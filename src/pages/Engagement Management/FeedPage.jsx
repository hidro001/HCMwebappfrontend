import { useState } from 'react'
import Feed from '../../components/engagement/Feed'
import FilterFeed from '../../components/engagement/FilterFeed/FilterFeed'
import GreetFeed from '../../components/engagement/todayCelebrate/GreetFeed'
import CategoriesListCompact from '../../components/engagement/FilterFeed/SynergyCategories'

const FeedPage = () => {

  const [category, setCategory] = useState('');
  const [department, setDepartment] = useState(null);
  const [sort, setSort] = useState('');

  return (
    <div className='flex justify-content overflow-hidden w-full h-full'>
     <div className='sticky w-[20%]'>
       <CategoriesListCompact onCategoryChange={setCategory}  />
     </div>
     <div className='w-[50%] h-screen' >
      <Feed curCategory={category} curDepartment={department} curSort={sort}/>
     </div>
     <div className=' w-[30%]'>
      <FilterFeed onDepartmentChange={setDepartment} onSort={setSort} />
      <GreetFeed />
     </div>
  </div>
  
  )
}

export default FeedPage