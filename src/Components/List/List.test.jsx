import List from '.';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'



describe('List Component', () => {
  it('renders and displays the list it is given', () => {
    const displayList = [
      {
        id: 1,
        text: 'Item 1',
        assignee: 'Assignee 1',
        difficulty: 4,
        complete: false,
      },
      {
        id: 2,
        text: 'Item 2',
        assignee: 'Assignee 2',
        difficulty: 3,
        complete: true,
      },
    ];

    render(<List list={displayList} displayList={displayList} toggleComplete={() => {}} />);

    displayList.forEach((item) => {
      const itemText = screen.getByText(item.text);
      const assigneeText = screen.getByText(`Assigned to: ${item.assignee}`);
      const difficultyText = screen.getByText(`Difficulty: ${item.difficulty}`);
      const completeText = screen.getByText(`Complete: ${item.complete.toString()}`);

      expect(itemText).toBeInTheDocument();
      expect(assigneeText).toBeInTheDocument();
      expect(difficultyText).toBeInTheDocument();
      expect(completeText).toBeInTheDocument();
    });
  });
});






