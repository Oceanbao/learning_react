// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { memo, useState, useEffect } from 'react'

import { createWorkerFactory, useWorker } from '@shopify/react-web-worker'

import { useCombobox } from './hooks/use-combobox'
import { useAsync, useForceRerender } from './perf-utils'

const createWorker = createWorkerFactory(() => import('./filter-cities'))

function Menu({
  items,
  getMenuProps,
  getItemProps,
  highlightedIndex,
  selectedItem,
}) {
  return (
    <ul {...getMenuProps()}>
      {items.map((item, index) => (
        <ListItem
          key={item.id}
          getItemProps={getItemProps}
          item={item}
          index={index}
          selectedItem={selectedItem}
          highlightedIndex={highlightedIndex}
        >
          {item.name}
        </ListItem>
      ))}
    </ul>
  )
}
Menu = memo(Menu)

function ListItem({
  getItemProps,
  item,
  index,
  selectedItem,
  highlightedIndex,
  ...props
}) {
  const isSelected = selectedItem?.id === item.id
  const isHighlighted = highlightedIndex === index
  return (
    <li
      {...getItemProps({
        index,
        item,
        style: {
          fontWeight: isSelected ? 'bold' : 'normal',
          backgroundColor: isHighlighted ? 'lightgray' : 'inherit',
        },
        ...props,
      })}
    />
  )
}
ListItem = memo(ListItem, (prevProps, nextProps) => {
  // true means do NOT rerender
  // false means DO rerender

  // these ones are easy if any of these changed, we should re-render
  if (prevProps.getItemProps !== nextProps.getItemProps) return false
  if (prevProps.item !== nextProps.item) return false
  if (prevProps.index !== nextProps.index) return false
  if (prevProps.selectedItem !== nextProps.selectedItem) return false

  // this is trickier. We should only re-render if this list item:
  // 1. was highlighted before and now it's not
  // 2. was not highlighted before and now it is
  if (prevProps.highlightedIndex !== nextProps.highlightedIndex) {
    const wasPrevHighlighted = prevProps.highlightedIndex === prevProps.index
    const isNowHighlighted = nextProps.highlightedIndex === nextProps.index
    return wasPrevHighlighted === isNowHighlighted
  }
  return true
})

// Better Memo - pass only primitive value from parent
function MenuPrimitive({
  items,
  getMenuProps,
  getItemProps,
  highlightedIndex,
  selectedItem,
}) {
  return (
    <ul {...getMenuProps()}>
      {items.map((item, index) => (
        <ListItemPrimitive
          key={item.id}
          getItemProps={getItemProps}
          item={item}
          index={index}
          isSelected={selectedItem?.id === item.id}
          isHighlighted={highlightedIndex === index}
        >
          {item.name}
        </ListItemPrimitive>
      ))}
    </ul>
  )
}
MenuPrimitive = memo(MenuPrimitive)

function ListItemPrimitive({
  getItemProps,
  item,
  index,
  isSelected,
  isHighlighted,
  ...props
}) {
  return (
    <li
      {...getItemProps({
        index,
        item,
        style: {
          fontWeight: isSelected ? 'bold' : 'normal',
          backgroundColor: isHighlighted ? 'lightgray' : 'inherit',
        },
        ...props,
      })}
    />
  )
}
ListItemPrimitive = memo(ListItemPrimitive)

function App() {
  console.log('RRR')
  const worker = useWorker(createWorker)

  const forceRerender = useForceRerender()
  const [inputValue, setInputValue] = useState('')

  const { data: allItems, run } = useAsync({ data: [], status: 'pending' })

  useEffect(() => {
    run(worker.getItems(inputValue))
    console.log('WORKER')
  }, [inputValue, run, worker])
  const items = allItems.slice(0, 100)

  const {
    selectedItem,
    highlightedIndex,
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    selectItem,
  } = useCombobox({
    items,
    inputValue,
    onInputValueChange: ({ inputValue: newValue }) => setInputValue(newValue),
    onSelectedItemChange: ({ selectedItem }) =>
      alert(
        selectedItem ? `You selected ${selectedItem.name}` : 'Selection Cleared'
      ),
    itemToString: item => (item ? item.name : ''),
  })

  return (
    <div className='relative h-80 w-80 list-none overflow-y-scroll bg-[#eee] p-0 [&_ul_li]:h-5'>
      <button onClick={forceRerender}>force rerender</button>
      <div>
        <label {...getLabelProps()}>Find a city</label>
        <div>
          <input {...getInputProps({ type: 'text' })} />
          <button onClick={() => selectItem(null)} aria-label='toggle menu'>
            &#10005;
          </button>
        </div>
        <MenuPrimitive
          items={items}
          getMenuProps={getMenuProps}
          getItemProps={getItemProps}
          highlightedIndex={highlightedIndex}
          selectedItem={selectedItem}
        />
      </div>
    </div>
  )
}

export default App
