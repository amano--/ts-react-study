import { act, renderHook } from '@testing-library/react-hooks'
import useCounter from '../useCounter'

type X = { x : string }
type Y = { y : string }

type Z = X & Y

const foo1 : Z = { x : 'foo', y : 'bar' }

const foo2 : { x : string } & { y : string } = foo1
const foo3 : { x : string , y : string } = foo1

type CheckIntersectionType<RESULT,A,B> = RESULT extends A & B ? true : false

type IsIntersectionType = CheckIntersectionType<Z,X,Y>
type IsIntersectionType2 = CheckIntersectionType<{ x : string } & { y : string },{ x : string },{ y : string }>
type IsIntersectionType3 = CheckIntersectionType<{ x : string , y : string },{ x : string },{ y : string }>
type IsIntersectionType4 = CheckIntersectionType<{ x : string , y : string, hoge : string },{ x : string },{ y : string }>

type IsIntersectionType5 = CheckIntersectionType<{ x : string  },{ x : string },{ y : string }>
type IsIntersectionType6 = CheckIntersectionType<{ x : string , y : number },{ x : string },{ y : string }>

const a : IsIntersectionType = true
// const b:IsIntersectionType = false
const a1 : true = true
// const a2 : true = false

const x = 2
const y = 2
const z = x * y

function checkIntersectionType(result,a,b){
  return result >= a * b ? true : false
}

console.log(checkIntersectionType(z,x,y))
console.log(checkIntersectionType(4,2,2))
console.log(checkIntersectionType(2,2,2))

describe('useCounter', () => {
  test('countは初期値0である', () => {
    const { result } = renderHook(() => useCounter())

    expect(result.current.count).toBe(0)
  })

  test('incrementを2回実行したとき、countは2である', () => {
    const { result } = renderHook(() => useCounter())

    act(() => {
      result.current.increment()
      result.current.increment()
    })

    expect(result.current.count).toBe(2)
  })

  test('decrementを2回実行したとき、countは-2である', () => {
    const { result } = renderHook(() => useCounter())

    act(() => {
      result.current.decrement()
      result.current.decrement()
    })

    expect(result.current.count).toBe(-2)
  })
})
