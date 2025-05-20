import { Fragment } from "react";
import './loading.css'

export function Loading({ loading }: { loading: boolean }) {
  return (
    <Fragment>
      <div className="w-full flex justify-center items-center">
        <span className={`loader ${loading ? '' : 'hidden'}`}></span>
      </div>
    </Fragment>
  )
}