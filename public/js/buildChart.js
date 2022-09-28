const voteButtons = document.querySelectorAll('form[data-id]');

voteButtons.forEach(el => {
    el.addEventListener(
        'submit',
        e => {
            e.preventDefault();
  
        // use axios to initialize a post request and send in the form data
            let id = el.getAttribute('data-id')
            axios.patch(`/seeds/likeSeed/${id}?_method=PATCH`)
            .then(function (response) {
                // wait for the success response from the server
                console.log(response);
                // remove the information from the form
            })
            .catch(function (error) {
                console.log(error);
                // handle any errors
                alert('There was a problem casting your vote. Please try again.')
            });
        }
    )
})

async function buildChart() {
    try {
        const id = document.querySelector('[data-name]').dataset.name
        const response = await fetch(`/communities/${id}/api`);
        const apiData = await response.json()

        const ctx = document.getElementById('voteChart').getContext('2d')
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(1, "#F3FAF7");   
        gradient.addColorStop(.8, "#DEF7EC");
        gradient.addColorStop(.7, "#BCF0DA")
        gradient.addColorStop(.6, "#84E1BC")
        gradient.addColorStop(.5, "#31C48D")
        gradient.addColorStop(.4, "#0E9F6E")
        gradient.addColorStop(.3, "#057A55")
        gradient.addColorStop(.2, "#046C4E")
        gradient.addColorStop(.1, "#03543F")
        gradient.addColorStop(0, "#014737")
        
        // let labels = []
        // let dataPoints = []
        let chartData = {
            labels: [],
            dataPoints: []
        }
        const seedsChart = apiData.seedsChart
        const populateSeedsChart = () => {
            seedsChart.forEach(el => {
                chartData.labels.push(el.title)
                chartData.dataPoints.push(el.likes)
            })
        }
        populateSeedsChart()
        console.log(chartData)
        // let labels = [
        //     apiData.seedsChart[0].title,
        //     apiData.seedsChart[1].title,
        //     apiData.seedsChart[2].title,
        //     apiData.seedsChart[3].title,
        //     apiData.seedsChart[4].title,
        // ]
        // let dataPoints = [
        //     apiData.seedsChart[0].likes,
        //     apiData.seedsChart[1].likes,
        //     apiData.seedsChart[2].likes,
        //     apiData.seedsChart[3].likes,
        //     apiData.seedsChart[4].likes
        // ]
        const data = {
            labels: chartData.labels,
            datasets: [{
              label: 'Community Initiatives',
              borderColor: 'rgb(255, 99, 132)',
              color: '#6B7280',
              backgroundColor: gradient,
              data: chartData.dataPoints,
            }]
        }
        const config = {
            type: 'bar',
            data: data,
            options: {
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                family: [
                                    'Inter', 
                                    'ui-sans-serif', 
                                    'system-ui', 
                                    '-apple-system', 
                                    'system-ui', 
                                    'Segoe UI', 
                                    'Roboto', 
                                    'Helvetica Neue', 
                                    'Arial', 
                                    'Noto Sans', 
                                    'sans-serif', 
                                    'Apple Color Emoji', 
                                    'Segoe UI Emoji', 
                                    'Segoe UI Symbol', 
                                    'Noto Color Emoji'
                                ]
                            }
                        }
                    }
                }
            }
        };
        const voteChart = new Chart(
            ctx,
            config
        );
    
        Pusher.logToConsole = true;
    
        var pusher = new Pusher('3366ff9c6cd3f8735a2d', {
        cluster: 'ap3'
        });
    
        var channel = pusher.subscribe('vote')
    
        channel.bind('likeSeed', (data) => {
            let newSeedsChart = data.newSeedsChart
            const populateNewSeedsChart = () => {
                newSeedsChart.forEach((el, i) => {
                    chartData.labels.splice(i, 1, el.title)
                    chartData.dataPoints.splice(i, 1, el.likes)
                    console.log(chartData)
                })
            }
            populateNewSeedsChart()
            voteChart.update()
        })
    } catch (error) {
        console.log(error)
    }
}

buildChart()