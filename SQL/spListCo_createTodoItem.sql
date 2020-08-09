CREATE DEFINER=`root`@`localhost` PROCEDURE `spListCo_createTodoItem`(IN listIdIn int)
BEGIN
	-- Get maximum position value of the list
	SELECT @position = MAX(POSITION) FROM TODO_ITEM WHERE LIST_ID = listIdIn;

    -- Deal with case where no todo items exist yet, hence max position is still null and the new todo item should have position 0
    SET @position = CASE WHEN (SELECT @position) IS NULL THEN 0 ELSE @position + 1 END;

    -- Insert new todo item
	INSERT INTO TODO_ITEM(`list_id`, `content`, `completed`, `position`) VALUES(listIdIn, '', false, @position);
END