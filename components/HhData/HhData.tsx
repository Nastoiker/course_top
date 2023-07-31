import {HhDataProps} from "./HhData.props";
import cn from "classnames";
import styles from './HhData.module.css'
import {Card} from "../Card/Card";
import RateSvg from './rate.svg';
import {priceRu} from "../../helpers/helpers";
export const HhData = ({count, juniorSalary, middleSalary, seniorSalary}: HhDataProps): JSX.Element => {
    return (
        <div className={styles.Hh}>
            <Card className={styles.count}>
                <div className={styles.title}>Всего ваканский</div>
                <div className={styles.CountValue}>{count}</div>
            </Card>
            <Card className={styles.salary}>
                <div>
                    <div className={styles.title}>Начальный</div>
                    <div className={styles.salaryValue}>{priceRu(juniorSalary)}</div>
                    <div className={styles.rate}>
                        <RateSvg className={styles.filled}/>
                        <RateSvg />
                        <RateSvg />
                    </div>
                </div>
                <div>
                    <div className={styles.title}>Средний</div>
                    <div className={styles.salaryValue}>{priceRu(middleSalary)}</div>
                    <div className={styles.rate}>
                        <RateSvg className={styles.filled}/>
                        <RateSvg className={styles.filled}/>
                        <RateSvg />
                    </div>
                </div>
                <div>
                    <div className={styles.title}>Профессионал</div>
                    <div className={styles.salaryValue}>{priceRu(seniorSalary)}</div>
                    <div className={styles.rate}>
                        <RateSvg className={styles.filled}/>
                        <RateSvg className={styles.filled}/>
                        <RateSvg className={styles.filled}/>
                    </div>
                </div>

            </Card>
        </div>
    )
}