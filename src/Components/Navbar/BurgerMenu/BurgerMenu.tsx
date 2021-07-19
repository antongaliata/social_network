import './burgerStyle.css'

type BurgerMenuType = {
    isOpenMenuBurger: boolean
    openCloseMenuBurger: (isOpen: boolean) => void
}

const BurgerMenu = (props: BurgerMenuType) => {

    const handlerMenu = () => {
        props.openCloseMenuBurger(!props.isOpenMenuBurger)
    }

    return <div onClick={handlerMenu} className={props.isOpenMenuBurger ? "change" : "containerBurgerMenu"}>
        <div className="bar1"/>
        <div className="bar2"/>
        <div className="bar3"/>
    </div>
}

export default BurgerMenu;