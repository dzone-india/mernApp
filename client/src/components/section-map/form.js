import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import './section-map.css';
import './map_form.css';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),

        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        },
    },
    primary: {
        backgroundColor: '#ef8822',
        borderRadius: '10px',
        '&:hover': {
            backgroundColor: '#00b0b8',
        },
    },


}));



const MapForm = ({searchLocation}) => {
    const classes = useStyles();
    // create state variables for each input
    const [search, setSearch] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');


    const clearSearch = () => {
        setSearch('');
        setCity('');
        setState('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (city == '' || state == '') return;

        searchLocation({city, state});
        clearSearch();
    };

    const cities = [

        {
            value: '',
            label: '',
        },
        {
            value: 'jaipur',
            label: 'Jaipur',
        },
        {
            value: 'BTC',
            label: '฿',
        },
        {
            value: 'JPY',
            label: '¥',
        },
    ];

    const states = [
        {
            value: '',
            label: '',
        },
        {
            value: 'rajesthan',
            label: 'Rajesthan',
        },
        {
            value: 'EUR',
            label: '€',
        },
        {
            value: 'BTC',
            label: '฿',
        },
        {
            value: 'JPY',
            label: '¥',
        },
    ];

    return (
        <form className={`${classes.root} map-form`} onSubmit={handleSubmit}>
            <TextField
                className="form-group"
                label="Location"
                variant="filled"
                required
                value={search}
                onChange={e => setSearch(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                className="form-group"
                id="city"
                select
                label="City"
                value={city}
                onChange={e => setCity(e.target.value)}
                //helperText="Please select City"
                variant="filled"
            >
                {cities.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                className="form-group"
                id="states"
                select
                label="State"
                value={state}
                onChange={e => setState(e.target.value)}
                //helperText="Please select State"
                variant="filled"
            >
                {states.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <div className="form-btn">
                {/* <Button variant="contained" onClick={() => { }}>
                    Reset
                </Button> */}
                <Button type="submit" className="search-btn" variant="contained" >
                    Search
                </Button>
            </div>
        </form>
    );
};

export default MapForm;