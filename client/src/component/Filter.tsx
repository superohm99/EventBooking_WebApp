interface FilterProps {
    list: string[];
}

function Filter(props: FilterProps) {
    const { list } = props
    const listItems = list.map(item => <option key={item}>{item}</option>)

    return (
        <select className="filter-list-container">
            {listItems}
        </select>
    )
}

export default Filter