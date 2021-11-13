// All issues
let currentIssues = [
    {
        id: "qm3bd",
        description: "The data is invalid. [ERROR_INVALID_DATA (0xD)]",
        date: "13 September 2021, 11:33:21 PM",
        priority: "high",
        employee: "hasan_12",
        status: "opened",
    },
    {
        id: "7mxmx",
        description: "The access code is invalid. [ERROR_INVALID_ACCESS (0xC)]",
        date: "13 September 2021, 09:30:21 PM",
        priority: "medium",
        employee: "mehedi_10",
        status: "closed",
    },
    {
        id: "bvdm3",
        description:
            "The directory cannot be removed. [ERROR_CURRENT_DIRECTORY (0x10)]",
        date: "13 September 2021, 07:11:21 PM",
        priority: "high",
        employee: "alif_11",
        status: "closed",
    },
    {
        id: "47hqw",
        description:
            "An attempt was made to load a program with an incorrect format. [ERROR_BAD_FORMAT (0xB)]",
        date: "13 September 2021, 04:15:21 PM",
        priority: "high",
        employee: "alif_11",
        status: "opened",
    },
    {
        id: "e3b2p",
        description:
            "The environment is incorrect. [ERROR_BAD_ENVIRONMENT (0xA)]",
        date: "12 September 2021, 03:42:21 PM",
        priority: "low",
        employee: "hasan_12",
        status: "opened",
    },
    {
        id: "6nyp5",
        description:
            "The storage control block address is invalid. [ERROR_INVALID_BLOCK (0x9)]",
        date: "12 September 2021, 01:48:21 PM",
        priority: "high",
        employee: "alif_11",
        status: "closed",
    },
    {
        id: "kolds",
        description:
            "Not enough storage is available to process this command. [ERROR_NOT_ENOUGH_MEMORY (0x8)]",
        date: "09 September 2021, 07:29:21 PM",
        priority: "medium",
        employee: "mehedi_10",
        status: "opened",
    },
    {
        id: "a5tex",
        description:
            "The storage control blocks were destroyed. [ERROR_ARENA_TRASHED (0x7)]",
        date: "08 September 2021, 11:20:21 PM",
        priority: "high",
        employee: "alif_11",
        status: "closed",
    },
    {
        id: "v53mq",
        description: "The handle is invalid. [ERROR_INVALID_HANDLE (0x6)]",
        date: "08 September 2021, 10:28:21 PM",
        priority: "medium",
        employee: "mehedi_10",
        status: "opened",
    },
    {
        id: "imtzr",
        description: "Access is denied. [ERROR_ACCESS_DENIED (0x5)]",
        date: "08 September 2021, 09:52:21 PM",
        priority: "low",
        employee: "hasan_12",
        status: "closed",
    },
    {
        id: "ppdi9",
        description:
            "The system cannot find the file specified. [ERROR_FILE_NOT_FOUND (0x2)]",
        date: "07 September 2021, 09:41:21 PM",
        priority: "high",
        employee: "mehedi_10",
        status: "closed",
    },
    {
        id: "s97m6",
        description: "Incorrect function. [ERROR_INVALID_FUNCTION (0x1)]",
        date: "07 September 2021, 09:28:21 PM",
        priority: "medium",
        employee: "alif_11",
        status: "opened",
    },
];

//this stores issue ids to generate unique id every time
let issueId_Array = [
    "yhadb",
    "0bb4g",
    "ma3bv",
    "8ti3r",
    "jq4uf",
    "zrzhq",
    "hln14",
    "47hqw",
    "e3b2p",
    "kolds",
    "v53mq",
    "s97m6",
];

//for theme toggling
let theme_toggle_btn = document.querySelector(".theme-change");

// main form
let [form, description_input, priority_input, assigned_input, submit] = [
    document.querySelector("form"),
    document.querySelector("#description"),
    document.querySelector("#priority"),
    document.querySelector("#assigned"),
    document.querySelector("#submit"),
];

// For actionNameShow
let timer01, timer03;

// Issue section
let all_Issue_parent_section = document.querySelector(".issue_info");
let all_Issues = [...document.querySelectorAll(".rows")];

//for row checkbox
let [lastIndex, someSelected] = [null, false];
let allIssueIDArr = [...document.querySelectorAll(".issue-id p span")];

//For Delete Marked Issues
let delete_marked_btn = document.querySelector("#delete-marked");
let delete_marked_btn_parent = document.querySelector(".deleteMarkedButton");

let confirmation_section = document.querySelector(".confirmation");
let delete_marked_confirm_btn = document.querySelector("#confirm_yes");
let delete_marked_cancel_btn = document.querySelector("#confirm_no");

let [total_deleted, total_notDeleted] = [0, 0];

// Main Chekbox
let mainCheckbox = document.querySelector("#mainCheckbox");

//For Search field
let searchField_open = document.querySelector(".searchField_open");
let searchInput = document.querySelector("input#search");
let searchField_close = document.querySelector(".searchField_close");

// for sorting based on date
let date_sort_btn = document.querySelector(".date_sort");

// For sorts based on priority Or assigned_to option
let body = document.querySelector("body");
let select_sort_btns = [...document.querySelectorAll(".select_sort_btn")];
let previous;
let dropdown_list_all_btns = [...document.querySelectorAll(".sortBtn-List li")];

// For status sort
let status_btn = document.querySelector(".status_sort");

// warning for small device
let container = document.querySelector(".container");
let warning_container = document.querySelector(".small-device-warning");
let warningClose_btn = document.querySelector("#warning-close");

//First Data Load
//after opening the page data will loaded based on date
if (localStorage.getItem("issues"))
    currentIssues = JSON.parse(localStorage.issues);

for (let i = currentIssues.length - 1; i >= 0; i--) {
    issueRowCreate(currentIssues[i]); //row created
}
rowCheckBoxFunc(); //after loading everything this will update
update_count(); //calculated opened, closed and total issue

//After loading all content. It will show a message for new visitor. Who visited for first time.
document.addEventListener("readystatechange", function () {
    if (document.readyState == "complete") {
        newVisitorMsg();
    }
});

// Theme toggling
theme_toggle_btn.addEventListener("click", () => {
    if (localStorage.getItem("theme") == "light") {
        html.setAttribute("theme", "dark");
        localStorage.setItem("theme", "dark");
    } //
    else if (localStorage.getItem("theme") == "dark") {
        html.setAttribute("theme", "light");
        localStorage.setItem("theme", "light");
    }
});

//Main form
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let description_input__value = description_input.value.trim();
    //removed white space

    if (
        inputValidation() &&
        description_input__value &&
        priority_input.value != "false" &&
        assigned_input.value != "false"
    ) {
        //Created temporary object using all value
        let inputValue_temp = {
            id: uniqueId(),
            description: description_input__value,
            date: currentTimeDate(),
            priority: priority_input.value,
            employee: assigned_input.value,
            status: "opened",
        };

        //New issue row created
        issueRowCreate(inputValue_temp);

        //newly created object pushed in main array
        currentIssues.unshift(inputValue_temp);

        //Event Listener for delete and close button added
        eventListenerForNewIssue();

        //checkbox functionalities updated
        rowCheckBoxFunc();

        // if any error happened before, this will clear them.
        error_addRemove(
            [description_input, priority_input, assigned_input],
            "remove_error_sign"
        );

        //if search filed opened, after adding new data search filed will close
        search_field_close();

        //Cleared activated sort icon
        disableActiveIcon();

        //Counting updated
        update_count();

        //Action name shows
        actionNameShow("Issue created successfully!");

        // Shows animation after creating a new issue
        showRowAnimation();

        // LocalStorage Updated
        update_localeStorage();

        // Cleared form after successful issue entry
        // form.reset();
    } else {
        //Description box validating
        if (!inputValidation() || !description_input__value) {
            if (!inputValidation()) {
                document.querySelector(
                    ".descriptionSection small.error"
                ).innerHTML = `Invalid input. <br>Only supports English Character, English Digits and .,~@#\`!%()^&_+=[]{}\|?/'"`;
            } else {
                document.querySelector(
                    ".descriptionSection small.error"
                ).innerHTML = "Type description";
            }

            //this will add a error sign
            error_addRemove([description_input], "false");
        } else {
            error_addRemove([description_input], "remove_Error_Sign");
        }

        error_addRemove([priority_input], priority_input.value);
        error_addRemove([assigned_input], assigned_input.value);
    }

    // add or remove errors
    function error_addRemove(sectionNames, addORremove) {
        sectionNames.forEach((errorElement) => {
            //If user doesn't input value or any input remain invalid this will add a class,which will show error sign

            addORremove == "false"
                ? errorElement.parentElement.classList.add("errorFound")
                : errorElement.parentElement.classList.remove("errorFound");
        });
    }

    //Validating inputed text
    function inputValidation() {
        /*
        This will prevent user from giving unwanted value. Like Bangladeshi word, any html tag
        */
        const regex = /[^(~@#$`!%()^&*_+=[\]\{}|;':",.\/\\?a-zA-Z0-9- )]+/gim;
        //Matches any character that is not in the set.

        //if anything matched outside the set, it will return true. But reversed it.
        return !regex.test(description_input__value);
    }

    //generate random unique issue-id
    function uniqueId() {
        //Generate Random ID
        let random_value = Math.random().toString(36).slice(2, 7);

        if (localStorage.getItem("issueIds"))
            issueId_Array = JSON.parse(localStorage.issueIds);

        //Checking Duplicate ID
        while (issueId_Array.includes(random_value)) {
            random_value = Math.random().toString(36).slice(2, 7);
        }
        //Pushed Random ID / Unique_id
        issueId_Array.push(random_value);

        localStorage.setItem("issueIds", JSON.stringify(issueId_Array));
        return random_value;
    }

    //Calculating ISO based time
    function currentTimeDate() {
        // let time = "2021-09-06T01:52:53.416Z"; //BASE TIME
        //it will be toISOString based time

        let curr_Time = new Date().toISOString();

        let hourMinuteSecond_Format = new Date(curr_Time).toLocaleString(
            "en-US",
            {
                hour: "2-digit",
                minute: "numeric",
                second: "numeric",
                hour12: true,
            }
        ); //Hour, Minute and Second

        let dateMonthYear_Format = new Date(curr_Time).toLocaleString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }); //Date Month Year

        let dateMonthYear_Format_Temp = dateMonthYear_Format.split(" ");
        let dateMonthYear_Format_Final = `${dateMonthYear_Format_Temp[1].slice(
            0,
            -1
        )} ${dateMonthYear_Format_Temp[0]} ${dateMonthYear_Format_Temp[2]}`;

        return dateMonthYear_Format_Final + ", " + hourMinuteSecond_Format;
    }

    // Shows animation after creating a new issue
    function showRowAnimation() {
        let singleRow = document.querySelector(".rows");
        singleRow.classList.add("show_animation");
        setTimeout(() => {
            singleRow.classList.remove("show_animation");
        }, 4500);
    }
});

//Delete marked issues
delete_marked_btn.addEventListener("click", () => {
    //confirmation section appears
    confirmation_section.classList.remove("hidden");
});

//Delete marked issues process CONFIRMED
delete_marked_confirm_btn.addEventListener("click", () => {
    let allOpenedItems = [...document.querySelectorAll(".currStatus")];

    allRowCheckBox = [
        ...document.querySelectorAll('.rows input[type="checkbox"]'),
    ];

    for (let index = allRowCheckBox.length - 1; index >= 0; index--) {
        //detects closed issues
        if (
            allRowCheckBox[index].checked &&
            allOpenedItems[index].classList.contains("closed")
        ) {
            currentIssues.splice(index, 1);
            update_localeStorage();

            let row = allRowCheckBox[index].parentElement.parentElement;
            issueDeleteAnimation(row);

            total_deleted++;
        }
        //detects opened issues
        else if (
            allRowCheckBox[index].checked &&
            allOpenedItems[index].classList.contains("opened")
        ) {
            total_notDeleted++;
        }
    }
    //
    if (total_deleted == 0) {
        actionNameShow("Only closed issues can be deleted!", true);
    } else {
        actionNameShow(
            `${
                total_notDeleted > 0
                    ? "You cannot delete opened items. So only"
                    : ""
            } ${
                total_deleted > 9 ? total_deleted : "0" + total_deleted
            } marked ${total_deleted > 1 ? "issues" : "issue"} deleted!`,
            false
        );
    }

    //reset value
    [total_deleted, total_notDeleted] = [0, 0];

    //hidden delete_marked_button & confirmation_section
    delete_marked_btn_parent.classList.add("hidden");
    confirmation_section.classList.add("hidden");

    //Heading checkbox and all checked issues un-checked after deleting closed issues
    document.querySelector("#mainCheckbox").checked = false;
    allRowCheckBox.forEach((check_box) => {
        check_box.checked = false;
        selectDeselect_ClsToggle(check_box, false);
    });
    someSelected = false;

    update_count();
});

//Delete marked process CANCELED
delete_marked_cancel_btn.addEventListener("click", () => {
    confirmation_section.classList.add("hidden");
});

// Main checkbox
//Mark all rows OR Unmark all selected rows
mainCheckbox.addEventListener("click", () => {
    allRowCheckBox = [
        ...document.querySelectorAll('.rows input[type="checkbox"]'),
    ];

    //This condition will detect any rows selected or not
    //if one or more rows keep selected, this statement will deselect them all.
    if (someSelected) {
        allRowCheckBox.forEach((check_box) => {
            check_box.checked = false; //ok

            selectDeselect_ClsToggle(check_box, false); //ok
        });
        someSelected = false;

        // while there will no selected rows, Delete Marked Item button will be hidden
        document.querySelector(".deleteMarkedButton").classList.add("hidden");
        document.querySelector(".confirmation").classList.add("hidden");
    }

    //if no rows selected this statment will select all rows
    else {
        allRowCheckBox.forEach((check_box) => {
            check_box.checked = true;

            selectDeselect_ClsToggle(check_box, true);
        });
        someSelected = true;

        // Changed the icon
        document.querySelector(
            ".checkbox-icon"
        ).innerHTML = `<i class="fas fa-check"></i>`;

        // if any rows keep selected , Delete Marked Item button will be shown
        document
            .querySelector(".deleteMarkedButton")
            .classList.remove("hidden");
    }
});

//Search field open
searchField_open.addEventListener("click", () => {
    searchInput.classList.remove("close");
    searchField_close.classList.remove("close");

    //changed the placeholder text as it is long for mobile device
    var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    if (width <= 830) {
        searchInput.placeholder = "Search";
    }
});

//Search field close
searchField_close.addEventListener("click", () => search_field_close("yes"));
function search_field_close(reload = "yes") {
    //if reload = false it will not reload all data, because sometimes reloading data is not necessary. Data will reload later.

    searchInput.classList.add("close");
    searchField_close.classList.add("close");

    if (reload == "yes" && searchInput.value.length > 0) {
        searchInput.value = "";

        all_Issues = [...document.querySelectorAll(".rows")];
        all_Issues.forEach((issue) => highlight_to_normal(issue));

        sortDomElement("descending", ".issue_date p", "date");
    }
}

//Search and sort
searchInput.addEventListener("keyup", () => {
    all_Issues = [...document.querySelectorAll(".rows")];

    disableActiveIcon();
    if (searchInput.value.length < 1) {
        all_Issues.forEach((issue) => highlight_to_normal(issue));
        sortDomElement("descending", ".issue_date p", "date");
        return;
    }

    //taking search value and passed to regex
    let serchValue = searchInput.value;
    let pattern = new RegExp(serchValue, "gi");

    //Adding highlighter tag and class
    all_Issues.forEach((issue) => {
        highlight_to_normal(issue);

        let issue_title = issue.querySelector(".issue-name p");

        //getting total matched word which will help to sort
        let matching = issue_title.innerHTML.match(pattern);

        //if there are no matched word match method will return null, thats why used this condition
        let totalMatch = matching == null ? 0 : matching.length;

        //addedd attribute to sort the rows with matches
        issue.setAttribute("total-matching", totalMatch);

        totalMatch > 0 && issue.classList.add("matched");

        //added highlight tag to highlight the mathced word
        issue_title.innerHTML = issue_title.innerHTML.replace(
            pattern,
            `<span class="highlight">$&</span>`
        );
        //$& will help to maintain case sensitivity.
    });

    // Sorting based on the most matching words
    all_Issues.sort(function (a, b) {
        let first = parseInt(a.getAttribute("total-matching"));
        let second = parseInt(b.getAttribute("total-matching"));

        return first < second ? 1 : first > second ? -1 : 0;
    });

    //Sorted data pushed into html document
    all_Issues.forEach((issue) => all_Issue_parent_section.appendChild(issue));
});

//sorts based on date
date_sort_btn.addEventListener("click", () => {
    search_field_close("noReload");
    //Reloading data is unnecessary now, because all data will sort and reload at next step.

    if (date_sort_btn.getAttribute("order") == "ascending") {
        sortDomElement("descending", ".issue_date p", "date");

        disableActiveIcon();
        date_sort_btn.setAttribute("order", "descending"); //added order attribute
    } else {
        sortDomElement("ascending", ".issue_date p", "date");

        disableActiveIcon();
        date_sort_btn.setAttribute("order", "ascending"); //added order attribute
    }
});

//sorts based on priority Or assigned_to option
//clicking on priority button or assigned buton, list will open and opened lists will close.
select_sort_btns.forEach((button) => {
    button.addEventListener("click", () => {
        /*
        There are two dropdown lists. Both of them will not open together. If one is opened while another is opened, another will be closed.
        */
        if (button.getAttribute("list-shown") == "no") {
            previous &&
                previous.getAttribute("list-shown") == "yes" &&
                dropdown_list_close(previous);
            //
            button.setAttribute("list-shown", "yes");

            button.querySelector(".fas").style.transform = "rotate(180deg)";

            let sorting_dropdown_list =
                button.parentElement.parentElement.querySelector(
                    ".sortBtn-List ul"
                );

            Object.assign(sorting_dropdown_list.style, {
                display: "block",
                height: "0px",
            });

            //adding height later for smoothness
            setTimeout(() => {
                sorting_dropdown_list.style.height = "100px";
            }, 0);
        } else if (button.getAttribute("list-shown") == "yes") {
            dropdown_list_close(button);
        }

        previous = button;
    });
});

//While the dropdown_list is open, clicking outside the dropdown list will close it.
body.addEventListener("click", (e) => {
    if (!e.target.hasAttribute("selectSort")) {
        dropdown_list_close(select_sort_btns[0]);
        dropdown_list_close(select_sort_btns[1]);
    }
});

//event listener for all buttons inside dropdown list
dropdown_list_all_btns.forEach((list_single_btn) => {
    list_single_btn.addEventListener("click", (e) => {
        search_field_close("noReload");
        //reloading data now is unecessary, because all data will sort and reload at next step.

        disableActiveIcon();

        dropdown_list_close(select_sort_btns[0]);
        dropdown_list_close(select_sort_btns[1]);

        function filter_issues() {
            let selctedBtn_parentClassName = e.target.parentElement.className;
            let selctedBtn_parentName =
                e.target.parentElement.getAttribute("sort-on");

            let selctedBtn_serial = parseInt(e.target.getAttribute("serial"));
            let all_Issues = [...document.querySelectorAll(".rows")];

            e.target.parentElement.parentElement.parentElement
                .querySelector("button")
                .setAttribute("order", "activeted");

            //Dynamically creating object to store items
            let currentIssues_temp = [];
            let separated_items = {};

            //creating object to push separated values
            let list_items = [
                ...document.querySelectorAll(
                    `.${selctedBtn_parentClassName} li`
                ),
            ];

            /*
    The button that will be clicked, the names of all the buttons in the list will be set as property in separated_items object. So, It will be easy to put the issues in the desired array. 
    It will look like below-

    {
        low_items: [],
        medium_items: [],
        high_items: [],
    } OR
    {
        mehedi_10_items: [],
        alif_11_items: [],
        hasan_12_items: [],
    }
    */

            list_items.forEach((listItem) => {
                separated_items[`${listItem.innerText.toLowerCase()}_items`] =
                    [];
            });

            //Sorting and storing into desired array
            all_Issues.forEach((issue) => {
                let selctedBtn_siblingsName = issue
                    .querySelector(`.${selctedBtn_parentName} p`)
                    .innerText.toLowerCase();

                separated_items[`${selctedBtn_siblingsName}_items`].push(issue);
            });

            let objToArr = Object.values(separated_items);
            for (let i = objToArr.length - 1; i >= 0; i--) {
                if (i == selctedBtn_serial) {
                    currentIssues_temp.unshift(...objToArr[selctedBtn_serial]);
                } else {
                    currentIssues_temp.push(...objToArr[i]);
                }
            }

            // Data reloaded
            currentIssues_temp.forEach((issue) =>
                all_Issue_parent_section.appendChild(issue)
            );
        }
        filter_issues();
    });
});

// sorts based on opened or closed issues.
status_btn.addEventListener("click", () => {
    all_Issues = [...document.querySelectorAll(".rows")];
    /*
    Assumed,
            open = ascending
            close = descending
    Data will sort based on 'opened' and 'closed' issues
    */
    search_field_close("noReload");
    //reloading data now is unecessary, because all data will sort and reload in sortDomElement().

    if (status_btn.getAttribute("order") == "ascending") {
        sortDomElement("ascending", ".currStatus p", "other");

        disableActiveIcon();
        status_btn.setAttribute("order", "descending");
    }
    //
    else {
        sortDomElement("descending", ".currStatus p", "other");

        disableActiveIcon();
        status_btn.setAttribute("order", "ascending");
    }
});

// Warning close button for small device visitors
warningClose_btn.addEventListener("click", () => {
    container.classList.remove("blur");
    warning_container.classList.remove("appear");

    setTimeout(() => {
        warning_container.style.display = "none";
    }, 800);

    setTimeout(() => {
        actionNameShow(
            `${localStorage.theme} theme applied according to your prefrences.`
        );
    }, 900);
});

// Localstorage clear button for testing
let localeStorageClearBtn = document.querySelector(".local_storage_clear_btn");
localeStorageClearBtn.addEventListener("click", () => {
    localStorage.clear();
    actionNameShow("Localstorage Cleared");
});

// This function will create issue Rows
function issueRowCreate(issue) {
    /*
    In the object stored the date with seconds but didn't showed seconds in html page.

    If one or more issue created in same time (minute same), they cannot be sorted properly based on date sort option. Thats why i kept second in object.
    */

    // let date = issue.date;
    // let date_separated = date.split(":");
    // let date_joined =
    //     date_separated[0] +
    //     ":" +
    //     date_separated[1] +
    //     " " +
    //     date_separated[2].split(" ")[1];
    //removed seconds from time

    let rowItems = `
<div class="">
  <input type="checkbox" name="" class="mark-checkbox">
</div>

<div class="issue_id_name">
  <div class="issue-id">
    <p>Issue-id: <span>${issue.id}</span>
    </p>
  </div>
  <div class="issue-name">
    <p> ${issue.description}</p>
  </div>
  <div class="issue-button">

    <button class="issue-button-close  ${
        issue.status == "closed" ? "disabled" : ""
    }" title="${issue.status == "closed" ? "Disabled" : ""}">Close</button>

    <button class="issue-button-delete ${
        issue.status == "opened" ? "disabled" : ""
    }" title="${issue.status == "opened" ? "Disabled" : ""}">Delete</button>

  </div>
</div>

<div class="issue_date">
  <p>${issue.date}</p>
</div>

<div class="priorityStatus ${issue.priority}">
  <p> ${issue.priority}</p>
</div>

<div class="employee-name">
  <p>${issue.employee}</p>
</div>

<div class="currStatus ${issue.status}">
  <p>${issue.status}</p>
</div>
    `;

    let row = document.createElement("div");
    row.className = "rows";
    row.innerHTML = rowItems;

    all_Issue_parent_section.insertAdjacentElement("afterbegin", row);

    eventListenerForNewIssue(); //added event listeners in each issue
    return;
}

// Checkbox mark / un-mark by holding shift key or normally
function rowCheckBoxFunc() {
    let allRowCheckBox = [
        ...document.querySelectorAll('.rows input[type="checkbox"]'),
    ];

    allRowCheckBox.forEach((check_box, index) => {
        //stored parent . Because checkbox input element will be removed
        let parentElement_of_checkbox = check_box.parentElement;

        let new_checkBox = check_box.cloneNode();
        //cloned input element

        check_box.remove();
        //removed old input element

        //added event listener with new input which has been cloned before
        new_checkBox.addEventListener("click", (event) => {
            // If user click on checkbox by holding shift key, there will need a start position.
            lastIndex == null && (lastIndex = index);

            if (event.shiftKey) {
                allRowCheckBox = [
                    ...document.querySelectorAll(
                        '.rows input[type="checkbox"]'
                    ),
                ];
                //updated values

                //getting start and end position
                let [start, end] = [
                    Math.min(index, lastIndex),
                    Math.max(index, lastIndex),
                ];

                //loop started from minimum number ends to maximum number.
                for (let i = start; i < end; i++) {
                    allRowCheckBox[i].checked =
                        allRowCheckBox[lastIndex].checked;
                    //if last index element is false all of them will be false, otherwise true

                    //background colour changer function of the parent row
                    selectDeselect_ClsToggle(
                        allRowCheckBox[i],
                        allRowCheckBox[lastIndex].checked
                    );
                }
            }

            // This will store the last selected or de-selected item
            lastIndex = index;

            //background colour changer function of the parent row
            selectDeselect_ClsToggle(new_checkBox, new_checkBox.checked);

            //if user mark on checkbox by clicking on single issue rows, a 'minus icon' will appear in heading checkbox.
            //OR, if user mark on checkbox by clicking head checkbox, a 'right icon' will appear.
            headingCheckBtn_IconToggle();
        });

        parentElement_of_checkbox.appendChild(new_checkBox);
    });
}

//Add event listener with new issue
function eventListenerForNewIssue() {
    let singleCloseBtn = document.querySelector(".issue-button-close");
    let singleDeleteBtn = document.querySelector(".issue-button-delete");

    //This will add event listener on delete button, which will only delete that row
    function singleRowDelete() {
        singleDeleteBtn.addEventListener("click", function (event) {
            // console.log({issueIndexNumber(event)});
            if (event.target.classList.contains("disabled")) {
                actionNameShow("You cannot delete an opened issue.", true);
            } else {
                currentIssues.splice(issueIndexNumber(event), 1)[0];
                update_localeStorage();

                let row =
                    event.target.parentElement.parentElement.parentElement;
                issueDeleteAnimation(row);

                actionNameShow("Issue deleted!");

                update_count();
            }
        });
    }
    singleRowDelete();

    //This will add event listener on close button, which will only close that row
    function singleRowClose() {
        singleCloseBtn.addEventListener("click", (event) => {
            if (event.target.classList.contains("disabled")) {
                actionNameShow("This issue has already been closed", true);
            } else {
                currentIssues[issueIndexNumber(event)].status = "closed";
                update_localeStorage();

                let row =
                    event.target.parentElement.parentElement.parentElement;
                row.querySelector(".currStatus").classList.remove("opened");
                row.querySelector(".currStatus").classList.add("closed");

                row.querySelector(".currStatus p").innerHTML = "closed";

                //disabled close button and changed text
                event.target.classList.add("disabled");
                event.target.innerHTML = "Closed";

                //enabled delete button of that row by removing disable class
                row.querySelector(".issue-button-delete").classList.remove(
                    "disabled"
                );

                //action name
                actionNameShow("Issue closed successfully.", false);

                update_count();
            }
        });
    }
    singleRowClose();

    //finds index number of targeted row.
    function issueIndexNumber(event) {
        let row = event.target.parentElement.parentElement.parentElement;
        let issue_id = row.querySelector(".issue-id p span").innerHTML;

        //Getting index positions of closed row. So that it will be easy to get the position of that row and the position will same with "currentIssues" array. So that we can close that value easly

        allIssueIDArr = [...document.querySelectorAll(".issue-id p span")];
        for (let i = 0; i < allIssueIDArr.length; i++) {
            if (issue_id == allIssueIDArr[i].innerHTML) {
                return i;
            }
        }
    }
}

// This will sort Html Dome Elements
function sortDomElement(order, elementSelector, type) {
    all_Issues = [...document.querySelectorAll(".rows")];

    // Below sort methods working on ascending method.
    // Date sort method and another string sort methods works diffrently, thats why used condition.

    if (type == "date") {
        all_Issues.sort(function (a, b) {
            let first = new Date(a.querySelector(elementSelector).innerText);
            let second = new Date(b.querySelector(elementSelector).innerText);

            return first < second ? -1 : first > second ? 1 : 0;
        });
    }
    //
    else if (type == "other") {
        all_Issues.sort(function (a, b) {
            let first = a.querySelector(elementSelector).innerText;
            let second = b.querySelector(elementSelector).innerText;

            return first < second ? -1 : first > second ? 1 : 0;
        });
    }

    //
    if (order == "ascending") {
        // Do nothing, because it already sorted before by ascending order
    } else if (order == "descending") {
        all_Issues.reverse();
    }

    // Data reloaded
    all_Issues.forEach((issue) => all_Issue_parent_section.appendChild(issue));
}

// Counts opened, closed and total issues and shows output at the bottom of the page
function update_count() {
    //
    let total_items = currentIssues.length;

    let total_opened_items = 0;
    currentIssues.forEach(
        (issue) => issue.status == "opened" && total_opened_items++
    );

    let total_closed_items = total_items - total_opened_items;

    document.querySelector(".total_opened span").innerHTML = total_opened_items;
    document.querySelector(".total_closed span").innerHTML = total_closed_items;
    document.querySelector(".total span").innerHTML = total_items;
}

//This will clear previously highlighted texts
function highlight_to_normal(issue) {
    let issue_title = issue.querySelector(".issue-name p");

    //Removed previously added highlighter span tag
    issue_title.innerHTML = issue_title.innerHTML.replace(
        /(<span class="highlight">|<\/span>)/gi,
        ""
    );

    issue.classList.remove("matched");
    issue.removeAttribute("total-matching");
}

// Localestorage will update after creating , closing and deleting an issue.
function update_localeStorage() {
    localStorage.setItem("issues", JSON.stringify(currentIssues));
}

//If any visitor visit this website for first time for any browser. It will show a message
function newVisitorMsg() {
    let width = window.innerWidth > 0 ? window.innerWidth : screen.width;

    if (!localStorage.visited_before) {
        if (width <= 700) {
            warning_container.style.display = "block";
            container.classList.add("blur");

            setTimeout(() => {
                warning_container.classList.add("appear");
            }, 0);
        }
        //
        else if (width > 700) {
            setTimeout(() => {
                actionNameShow(
                    `${localStorage.theme} theme applied according to your prefrences.`
                );
            }, 500);
        }

        localStorage.setItem("visited_before", true);
    }
}

//Closes dropdown list.
function dropdown_list_close(button) {
    clearTimeout(timer03);

    button.setAttribute("list-shown", "no");
    button.querySelector(".fas").style.transform = "rotate(0deg)";

    let sorting_dropdown_list =
        button.parentElement.parentElement.querySelector(".sortBtn-List ul");

    sorting_dropdown_list.style.height = "0px";

    //adding display:none later for smoothness
    timer03 = setTimeout(() => {
        sorting_dropdown_list.style.display = "none";
    }, 300);
}

//shows animation while deleting a issue
function issueDeleteAnimation(row) {
    row.classList.add("wipeOut");
    //row wiped

    let paddingTop = parseFloat(getComputedStyle(row).paddingTop, 10);
    let paddingBottom = parseFloat(getComputedStyle(row).paddingBottom, 10);
    row.style.height = row.clientHeight - (paddingBottom + paddingTop) + "px";

    /*
    Removed padding
    Because clientHeight returns the inner height + padding
    If padding height doesn't decrease, it will not smooth enough.

    Also using parent.style.padding = "0px"; is not working properly.
    */
    setTimeout(() => {
        row.classList.add("decreaseHeight");
        //row wiped previously but not deleted. Now it will decrease its height. So it will be smooth.
    }, 400);

    setTimeout(() => {
        row.remove();
        //row deleted completly
    }, 400 + 400);
}

//MOVE THIS FROM HERE
// if any row or all rows selected there will be a minus icon in heading checkbox.
function headingCheckBtn_IconToggle() {
    allRowCheckBox = [
        ...document.querySelectorAll('.rows input[type="checkbox"]'),
    ];
    someSelected = false;

    for (let i = 0; i < allRowCheckBox.length; i++) {
        //checking checkbox checked or unchecked
        if (allRowCheckBox[i].checked) {
            someSelected = true;
            break;
        }
    }

    // IF any checkbox checked a unselect all icon will appear in mainCheckbox
    if (someSelected) {
        // checkbox icon swap
        document.querySelector(
            ".checkbox-icon"
        ).innerHTML = `<i class="fas fa-minus"></i>`;

        // Main checkbox checked
        document.querySelector("#mainCheckbox").checked = true;

        // if any rows keep selected , Delete Marked Item button will be shown
        document
            .querySelector(".deleteMarkedButton")
            .classList.remove("hidden");
    }

    // IF NO checkbox checked unselect all icon will disappear from mainCheckbox
    else {
        // Main checkbox un-checked
        document.querySelector("#mainCheckbox").checked = false;

        // while there will no selected rows, Delete Marked Item button will be hidden
        document.querySelector(".deleteMarkedButton").classList.add("hidden");
        document.querySelector(".confirmation").classList.add("hidden");
    }
}

// Helps to change background color of any selected or un-selected rows
function selectDeselect_ClsToggle(input, addRemove) {
    /*
    If any checkbox keep selected this function will replace the background colour of that row
    */
    let parentRow_ClassList = input.parentElement.parentElement.classList;

    addRemove
        ? parentRow_ClassList.add("selected")
        : parentRow_ClassList.remove("selected");
}

// This will clear active sort icon
function disableActiveIcon() {
    [...document.querySelectorAll("button[order]")].forEach((element) =>
        element.setAttribute("order", "neutral")
    );
}

//Action name show
function actionNameShow(actionName, isNagative) {
    let [actionDiv_main, actionDiv_innerHtml] = [
        document.querySelector(".actionMsg_section"),
        document.querySelector(".actionMsg_section p"),
    ];

    actionDiv_innerHtml.innerHTML = actionName; //new action name

    // If user click two buttons between 3 second, new action pop up will close at previous decleared time. thats why reseted those
    clearTimeout(timer01);
    actionDiv_main.classList.remove("shown");

    // color
    actionDiv_innerHtml.className = isNagative ? "negative" : "positive";

    setTimeout(() => {
        actionDiv_main.classList.add("shown");
    });

    timer01 = setTimeout(() => {
        actionDiv_main.classList.remove("shown");
    }, 4000);
}
