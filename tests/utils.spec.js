import {
    DataSourceClear
} from '@/utils'


describe("test utils", () => {
    it("datasource clear empty rows", () => {
        const source = [
            ["product", "2015", "2016", "2017"],
            ["Matcha Latte", 43.3, "", 93.7],
            ["", "", "", "", ""]
        ]
        const clearedSource = [
            ["product", "2015", "2016", "2017"],
            ["Matcha Latte", 43.3, "", 93.7],
        ]

        expect(DataSourceClear(source)).toStrictEqual(clearedSource)
    })
})