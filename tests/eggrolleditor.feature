Feature: eggroll editor

	Scenario: add new user story to github
		Given I am not a developer
		And Not familiar with Cucumber
		And I Have Signed In to Github
		When I use eGGroll Editor
		Then user stories are saved in Github with ease!
