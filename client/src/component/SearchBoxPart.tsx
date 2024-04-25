import '../style/SearchBoxPart.css'

interface SearchBoxPartProps {
    title: string;
    list: string[];
}

function SearchBoxPart(props: SearchBoxPartProps) {
    const { title, list } = props
    const listItems = list.map(item => <option key={item}>{item}</option>)

    return (
        <div className='part-container'>
            <p>{title}</p>
            <div className='list-container'>
                <select>{listItems}</select>
                <hr />
            </div>
        </div>
    )
}

export default SearchBoxPart