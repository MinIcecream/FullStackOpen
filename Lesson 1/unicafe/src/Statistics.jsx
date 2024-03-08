import StatisticLine from './StatisticLine' 
import './Statistics.css';
function Statistics(props) { 
    const {neutral, bad, good} = props 
    return (  
        <table>
            <tbody> 
                    <StatisticLine text="good" statistic = {good}/>
                    <StatisticLine text="neutral" statistic = {neutral}/>
                    <StatisticLine text="bad" statistic = {bad}/>
                    <StatisticLine text="all" statistic = {bad+good+neutral}/>
                    <StatisticLine text="average" statistic = {(good-bad)/(bad+good+neutral)}/>
                    <StatisticLine text="positive" statistic = {(good)/(bad+good+neutral) * 100 + "%"}/>
            </tbody>  
        </table>   
    )
  }
  
  export default Statistics
  