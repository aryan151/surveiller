const TOGGLE = 'theme/TOGGLE'
const SET_THEME = 'theme/SET_THEME'
 


const toggleThemeAction = (theme) => {
    return {
        type: TOGGLE,
        theme
    };
};

const setThemeAction = (theme) => {
    return {
        type: SET_THEME,
        theme
    };
};


export const toggleTheme = () => (dispatch) => {
    const currentTheme = localStorage.getItem('themelang')
    const newTheme = currentTheme === 'usa' ? 'eur' : 'usa'
    localStorage.setItem('themelang', newTheme)
    dispatch(toggleThemeAction(newTheme)) 
}

export const setTheme = () => (dispatch) =>{
    const isThemeInStorage = localStorage.getItem('themelang')
    const theme = isThemeInStorage ? isThemeInStorage : 'eur'
    localStorage.setItem('themelang', theme)
    dispatch(setThemeAction(theme))
}

const initialState = null

const themeReducer = (state=initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_THEME:
            newState = action.theme
            return newState
        case TOGGLE:
            newState = action.theme
            return newState
        default:
            return state
    }
}

export default themeReducer; 