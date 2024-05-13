/**
 * @jest-environment jsdom
 */
import {render, screen, waitFor} from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { createLibraryItem } from '../../src/utils';
import { LibraryItem } from '../../src/components/LibraryItem';
import * as LibraryEntryPoint from '../../src/entry-point';
import { ItemData } from "../../src/LibraryUtilities";
import { HostingContextType } from '../../src/SharedTypes';



test('loads and displays greeting', async () => {

    let libController = LibraryEntryPoint.CreateLibraryController();
    let libContainer = libController.createLibraryContainer() as any
    let x = render(libContainer);
    await waitFor(() => expect(screen.getByText('This is LibraryContainer')).not.toBe(null))
    libController.setHostContext(HostingContextType.home)
    let data = createLibraryItem(ItemData);

    let item = new ItemData("");
    item.text = "hidden";
    item.itemType = "category";
    data.hiddenInWorkspaceContext = true
    data.appendChild(item);

  // ARRANGE
    render(<LibraryItem libraryContainer={libContainer}  data={data} showItemSummary={false}  /> as any)
  // ACT
  await userEvent.click(screen.getByText('TestItem'))
  await screen.findByText('Child0')

  // ASSERT
  expect(screen.getByText('Child0')).not.toBe(null)
  expect(screen.getByText('Child1')).not.toBe(null)
  expect(screen.getByText('hidden')).toBe(null)

  //expect(screen.getByRole('button')).toBeDisabled()
})