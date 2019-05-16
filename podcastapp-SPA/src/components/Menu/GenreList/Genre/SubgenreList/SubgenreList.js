import React from 'react';
import Subgenre from './Subgenre/Subgenre';


class SubgenreList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: ''
        }
    }

    createArray = () => {
        
        let array = [];
            for (var sub in this.props.subgenres) {
                if (this.props.subgenres.hasOwnProperty(sub)) {
                    let id = sub;
                    let name = this.props.subgenres[sub].name;
                    array.push(id, name);
                }
            }
            return array;
        
    }

    

    render() {
        let multiArray = this.createArray();
        let idList = [];
        let namesList = [];
        multiArray.map((val, i) => {
            if (i%2 === 1) {
                namesList.push(val);
            } else if(i%2 === 0) {
                idList.push(val);
            }
        })
        return (
                <li>
                    {
                       idList.map((id, i) => {
                           return <Subgenre 
                                        key={id}
                                        id={id}
                                        name={namesList[i]}
                                        getGenre={this.props.getGenre}
                           />
                       }) 
                    }
                </li>
            )    
    }                
    
}

export default SubgenreList;