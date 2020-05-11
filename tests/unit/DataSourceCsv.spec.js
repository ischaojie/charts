import {
    mount
} from '@vue/test-utils'
import DataSourceCsv from '@/components/DataSourceCsv.vue'

describe('DataSourceCsv.vue', () => {
    let arr = [
        ['abc', 'bcd', 'cde'],
        [1, 2, 3],
        [4, 5, 6]
    ]
    let csv = '"abc","bcd","cde"\n"1","2","3"\n"4","5","6"'

    it('test arr to csv', () => {
        const wrapper = mount(DataSourceCsv)

        expect(wrapper.vm.arr2Csv(arr)).toBe(csv)
    })

    it('test csv to arr', ()=>{
        
    })
})