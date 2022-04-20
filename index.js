const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 

💡 HINT: You may want to filter the data first 😉*/

//(a) Home Team name for 2014 world cup final

//(b) Away Team name for 2014 world cup final

//(c) Home Team goals for 2014 world cup final

//(d) Away Team goals for 2014 world cup final

//(e) Winner of 2014 world cup final */

const year2014 = fifaData.filter((object) => {
    return object.Year === 2014;
});

const filteredFinals = year2014.filter((object) => {
    return object.Stage === 'Final'
});

console.log(filteredFinals[0]['Home Team Name']);
console.log(filteredFinals[0]['Away Team Name']);
console.log(filteredFinals[0]['Home Team Goals']);
console.log(filteredFinals[0]['Away Team Goals']);
console.log(filteredFinals[0]['Win conditions']);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the teams that made it to the final stage

💡 HINT - you should be looking at the stage key inside of the objects
*/


function getFinals(array) {
    let finalsTeams = array.filter((object) => {
        return object.Stage === 'Final'; 
    });
    return finalsTeams;
 }
 console.log(getFinals(fifaData));
 



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(array, cb) {
    let years = [];
    cb(array).forEach((object) => {
        years.push(object.Year);
    });
    return years;
}
console.log(getYears(fifaData, getFinals));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(array, cb) {
    let finals = cb(array);
    let winners = [];
    finals.forEach((final) => {
        if(final['Home Team Goals'] > final['Away Team Goals']){
            winners.push(final['Home Team Name']);
        }else{
            winners.push(final['Away Team Name']);
        }
        /*     for(let i = 0; i < finals.length; i++){
                if(finals[i]['Home Team Goals'] > finals[i]['Away Team Goals']){
                    winners.push(finals[i]['Home Team Name']);
                }else{
                    winners.push(finals[i]['Away Team Name']);
                }
            } */
    });
    return winners;
}
console.log(getWinners(fifaData, getFinals));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(array, getFinalsCB, getYearsCB, getWinnersCB) {
    let allFinals = getFinalsCB(array);
    let allYears = getYearsCB(array, getFinalsCB);
    let allWinners = getWinnersCB(array, getFinalsCB);
    let statement = [];
   for(let i = 0; i < allFinals.length; i++){
       statement.push(`In ${allYears[i]}, ${allWinners[i]} won the world cup!`)
   }
   return statement;
}
console.log(getWinnersByYear(fifaData, getFinals, getYears, getWinners));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive a callback function in a parameter that will take getFinals (from task 2) as an argument and ensure you pass in the fifaData as its argument
 
 💡 HINT: Example of invocation: getAverageGoals(getFinals(fifaData));

 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
 
*/

function getAverageGoals(getFinalsCB) {
    let finals = getFinalsCB;
    let averageGoals = finals.reduce((accumulator, current) => {
        return (accumulator + current['Home Team Goals'] + current['Away Team Goals']);
    }, 0);
    averageGoals = (averageGoals/finals.length).toFixed(2);
    return averageGoals;
 }
console.log(getAverageGoals(getFinals(fifaData)));



/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */



function getCountryWins(data, initials) {
    return data.reduce((accumulator, current)=>{
        if(current.Stage === 'Final'){
            if(current['Home Team Initials'] === initials && current['Home Team Goals'] >  current['Away Team Goals']){
                return accumulator + 1;
            }
            else if(current['Away Team Initials'] === initials && current['Away Team Goals'] > current['Home Team Goals']){
                return accumulator + 1;
            }
        }
        return accumulator;
    },0);
}
console.log(getCountryWins(fifaData,'BRA'));



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */


function getFinalsTeams(data){
    let finalsTeams = {};
    data.forEach((item) => {
        if(item.Stage === 'Final'){
            if(!finalsTeams[item['Home Team Name']]){
                finalsTeams[item['Home Team Name']] = {};
                finalsTeams[item['Home Team Name']].Goals = 0;
                finalsTeams[item['Home Team Name']].Appearance = 0;
            }
            if(!finalsTeams[item['Away Team Name']]){
                finalsTeams[item['Away Team Name']] = {};
                finalsTeams[item['Away Team Name']].Goals = 0;
                finalsTeams[item['Away Team Name']].Appearance = 0;
            }

/*             const teams = {
                'Brazil': {Goals: 0, Appearance: 0},
                'Germany': {Goals: 0, Appearance: 0}
              } */

            const finalTeamHome = finalsTeams[item['Home Team Name']];
            finalTeamHome.Goals += item['Home Team Goals'];
            finalTeamHome.Appearance += 1;
            
            const finalTeamAway = finalsTeams[item['Away Team Name']];
            finalTeamAway.Goals += item['Away Team Goals'];
            finalTeamAway.Appearance += 1;
            
/*             const teams = {
                  'Brazil': {Goals: '1'},
                  'Germany': {Goals: '1'}
                } */
          //  finalsTeams.push(item['Home Team Name']) && finalsTeams.push(item['Away Team Name']);
        }
    });
    return finalsTeams;
}

console.log(getFinalsTeams(fifaData));

function getGoals(data) {
    const finalsTeamInfo = getFinalsTeams(data);
    let highestAvg = 0;
    let bestTeam = '';
        for(const team in finalsTeamInfo){
            const averageScore = finalsTeamInfo[team].Goals / finalsTeamInfo[team].Appearance
            if(averageScore > highestAvg){
                highestAvg = averageScore;
                bestTeam = team;
            }
        }
        return bestTeam;
}
console.log(getGoals(fifaData));



/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */
function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
