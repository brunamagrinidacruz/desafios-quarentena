const PARALIZED = "paralized";

function scanProperties(properties, opponent) {
    if(properties == undefined) {
        return;
    }

    for (var key in properties) {
        switch(key) {
            case PARALIZED:
                //If it's paralized, just continiung paralized
                if(opponent.getParalized() > 0) return;
                //If the number is less than 10, paralized!
                let random = Math.floor(Math.random() * 100)
                if(random < 10) opponent.setParalized(properties[key]);
                break;
        }        
    }

    
}