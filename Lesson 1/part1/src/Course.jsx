import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({name, parts}) => {
    const sum = parts.reduce((sum,cur) => sum + cur.exercises, 0);

    return (
        <div>
        <Header course = {name} />
        <Content parts = {parts} /> 
        <Total sum = {sum}/>
        </div>
   )
}

export default Course