import dynamic from 'next/dynamic'

// 小的业务或者ui组件在此处导出
// 引用 import { VcgIcon } from 'vcg'
export const VcgIcon = dynamic(() => import('~/components/common/vcg-icon'))
export const SortDropDown = dynamic(() => import('~/components/common/sort-dropdown'))
export const CountInput = dynamic(() => import('~/components/common/count-input'))
export const VcgTable = dynamic(() => import('~/components/common/vcg-table'))
export const VcgTab = dynamic(() => import('~/components/business/center/vcg-tab'))
export const Pagination = dynamic(() => import('~/components/common/pagination'))

