const weekamount=async()=>{
    document.getElementById('weekbtn').classList.add('ring-indigo-500', 'bg-indigo-50','text-blue-500')
    document.getElementById('monthbtn').classList.remove('ring-indigo-500', 'bg-indigo-50','text-blue-500')
    document.getElementById('ogaintbtn').classList.remove('ring-indigo-500', 'bg-indigo-50','text-blue-500')
    document.getElementById('todayobtn').classList.remove('ring-indigo-500', 'bg-indigo-50','text-blue-500')
    document.getElementById('daterangebtn').classList.remove('ring-indigo-500', 'bg-indigo-50','text-blue-500')
    const api='/html/jsondata/monthlydata.json'

    try {
        const response=await fetch(api, {
            method:'GET'
        })
        if(!response.ok){
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        else{
            const data=await response.json()
          
                document.getElementById('investamt').innerHTML=data[0].week.investamount
                document.getElementById('currentamt').innerHTML=data[0].week.currentvalue
                document.getElementById('overgain').innerHTML=data[0].week.overallgain
                document.getElementById('todaygain').innerHTML=data[0].week.todaygain
          

        }

    } catch (error) {
        document.getElementById('error').classList.remove('hidden')
        document.getElementById('error_msg').textContent=error.message
    }
    finally{
        
        setTimeout(() => {
            document.getElementById('loading').style.display='none'
            document.getElementById('amounttradepanel').classList.remove('hidden')
        }, 3000);
    }
}

weekamount()

const day15amount=async()=>{
    document.getElementById('monthbtn').classList.add('ring-indigo-500', 'bg-indigo-50','text-blue-500')

    document.getElementById('amounttradepanel').classList.add('hidden')
    document.getElementById('weekbtn').classList.remove('ring-indigo-500', 'bg-indigo-50','text-blue-500')
    document.getElementById('ogaintbtn').classList.remove('ring-indigo-500', 'bg-indigo-50','text-blue-500')
    document.getElementById('todayobtn').classList.remove('ring-indigo-500', 'bg-indigo-50','text-blue-500')
    document.getElementById('daterangebtn').classList.remove('ring-indigo-500', 'bg-indigo-50','text-blue-500')
      document.getElementById('loading').style.display='block'
   
    const api='/html/jsondata/monthlydata.json'

    try {
        const response=await fetch(api, {
            method:'GET'
        })
        if(!response.ok){
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        else{
            const data=await response.json()
            document.getElementById('investamt').innerHTML=data[1].day_15.investamount
           document.getElementById('currentamt').innerHTML=data[1].day_15.currentvalue
           document.getElementById('overgain').innerHTML=data[1].day_15.overallgain
           document.getElementById('todaygain').innerHTML=data[1].day_15.todaygain

        }

    } catch (error) {
        document.getElementById('error').classList.remove('hidden')
        document.getElementById('error_msg').textContent=error.message
    }
    finally{
      setTimeout(() => {
        document.getElementById('loading').style.display='none'
        document.getElementById('amounttradepanel').classList.remove('hidden')
      }, 3000);
    }
}


const monthamt=async()=>{
    document.getElementById('amounttradepanel').classList.remove('hidden')
    document.getElementById('weekbtn').classList.remove('ring-indigo-500', 'bg-indigo-50','text-blue-500')
    document.getElementById('monthbtn').classList.remove('ring-indigo-500', 'bg-indigo-50','text-blue-500')
    document.getElementById('ogaintbtn').classList.add('ring-indigo-500', 'bg-indigo-50','text-blue-500')
    document.getElementById('todayobtn').classList.remove('ring-indigo-500', 'bg-indigo-50','text-blue-500')
    document.getElementById('daterangebtn').classList.remove('ring-indigo-500', 'bg-indigo-50','text-blue-500')
    document.getElementById('amounttradepanel').classList.add('hidden')
    document.getElementById('loading').style.display='block'
    const api='/html/jsondata/monthlydata.json'

    try {
        const response=await fetch(api, {
            method:'GET'
        })
        if(!response.ok){
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        else{
            const data=await response.json()
            document.getElementById('investamt').innerHTML=data[2].month.investamount
           document.getElementById('currentamt').innerHTML=data[2].month.currentvalue
           document.getElementById('overgain').innerHTML=data[2].month.overallgain
           document.getElementById('todaygain').innerHTML=data[2].month.todaygain

        }

    } catch (error) {
        document.getElementById('error').classList.remove('hidden')
        document.getElementById('error_msg').textContent=error.message
    }
    finally{
       setTimeout(() => {
        document.getElementById('loading').style.display='none'
        document.getElementById('amounttradepanel').classList.remove('hidden')
       }, 3000);
    }
}



const moth_3=async()=>{
    document.getElementById('amounttradepanel').classList.remove('hidden')
    document.getElementById('weekbtn').classList.remove('ring-indigo-500', 'bg-indigo-50','text-blue-500')
    document.getElementById('monthbtn').classList.remove('ring-indigo-500', 'bg-indigo-50','text-blue-500')
    document.getElementById('ogaintbtn').classList.remove('ring-indigo-500', 'bg-indigo-50','text-blue-500')
    document.getElementById('todayobtn').classList.add('ring-indigo-500', 'bg-indigo-50','text-blue-500')
    document.getElementById('daterangebtn').classList.remove('ring-indigo-500', 'bg-indigo-50','text-blue-500')
    document.getElementById('amounttradepanel').classList.add('hidden')
    document.getElementById('loading').style.display='block'
    const api='/html/jsondata/monthlydata.json'

    try {
        const response=await fetch(api, {
            method:'GET'
        })
        if(!response.ok){
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        else{
            const data=await response.json()
            document.getElementById('investamt').innerHTML=data[3].month_3.investamount
           document.getElementById('currentamt').innerHTML=data[3].month_3.currentvalue
           document.getElementById('overgain').innerHTML=data[3].month_3.overallgain
           document.getElementById('todaygain').innerHTML=data[3].month_3.todaygain

        }

    } catch (error) {
        document.getElementById('error').classList.remove('hidden')
        document.getElementById('error_msg').textContent=error.message
    }
    finally{
       setTimeout(() => {
        document.getElementById('loading').style.display='none'
        document.getElementById('amounttradepanel').classList.remove('hidden')
       }, 3000);
    }
}
