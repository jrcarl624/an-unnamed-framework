import {
	MessageFormData,
	ActionFormData,
	ModalFormData,
	ActionFormResponse,
	MessageFormResponse,
	ModalFormResponse,
} from "mojang-minecraft-ui";
import { Player, world as World } from "mojang-minecraft";
import fs from "fs";
import { type } from './../../types/index';

interface ActionFormButtonComponent {
	label: string;
	icon?: fs.PathLike & string;
	type: "button";
}

const ActionForm = class {
	buttons: ActionFormButtonComponent[];
	title: string;
	body: string;
	constructor(
		title?: string,
		body?: string,
		buttons?: ActionFormButtonComponent[]
	) {
		this.title = title || "";
		this.body = body || "";
		this.buttons = buttons || [];
	}
	show(
		player: Player,
		callback: (response: ActionFormResponse) => void,
		delay: number = 5
	) {
		let ticks = 0;
		let form = new ActionFormData();
		form.title(this.title);
		form.body(this.body);
		for (let button of this.buttons) {
			form.button(button.label, button.icon);
		}

		let event = World.events.tick.subscribe(() => {
			ticks++;
			if (ticks > delay * 20 - 1) {
				World.events.tick.unsubscribe(event);

				form.show(player).then(callback);
			}
		});
	}
};

const MessageForm = class {
	title: string;
	body: string;
	button1: string;
	button2: string;

	constructor(
		title?: string,
		body?: string,
		button1?: string,
		button2?: string
	) {
		this.title = title || "";
		this.body = body || "";
		this.button1 = button1 || "";
		this.button2 = button2 || "";
	}
	show(
		player: Player,
		callback: (response: MessageFormResponse) => void,
		delay: number = 5
	) {
		let ticks = 0;
		let form = new MessageFormData();
		form.title(this.title);
		form.body(this.body);
		form.button1(this.button1);
		form.button2(this.button2);

		let event = World.events.tick.subscribe(() => {
			ticks++;
			if (ticks > delay * 20 - 1) {
				World.events.tick.unsubscribe(event);
				form.show(player).then(callback);
			}
		});
	}
};
interface ModalFormTextFieldComponent {
	label: string;
	placeholder: string;
	type: "text";
	value?: string;
}
interface ModalFormSliderComponent {
	label: string;
	type: "slider";
	value?: number;
	min: number;
	max: number;
	step: number;
}
interface ModalFormDropdownComponent {
	label: string;
	type: "dropdown";
	options: string[];
	index?: number;
}
interface ModalFormToggleComponent {
	label: string;
	type: "toggle";
	value?: boolean;
}
interface ModalFormIconComponent {
	type: "icon";
	value: string & fs.PathLike;
}




var ModalFormComponentTypes: Record<string, (form: ModalFormData,data:ModalFormComponentData)=>ModalFormData> = {};






type ModalFormComponent =
	| ModalFormTextFieldComponent
	| ModalFormSliderComponent
	| ModalFormDropdownComponent
	| ModalFormToggleComponent
	| ModalFormIconComponent;

const ModalForm = class {
	title: string;
	components: ModalFormComponent[];
	componentTypes = ModalFormComponentTypes;

	constructor(title?: string, components?: ModalFormComponent[]) {
		this.title = title || "";
		this.components = components || [];
	}
	show(
		player: Player,
		callback: (response: ModalFormResponse) => void,
		delay: number = 5
	) {
		let ticks = 0;
		let form = new ModalFormData();
		form.title(this.title);
		for (let component of this.components) {
			switch (component.type) {
				case "text":
					form.textField(component.label, component.placeholder);
					break;
				case "slider":
					form.slider(
						component.label,
						component.min,
						component.max,
						component.step,
						component.value
					);
					break;
				case "dropdown":
					form.dropdown(
						component.label,
						component.options,
						component.index
					);
					break;
				case "toggle":
					form.toggle(component.label, component.value);
					break;
				case "icon":
					form.icon(component.value);
			}
		}

		let event = World.events.tick.subscribe(() => {
			ticks++;
			if (ticks > delay * 20 - 1) {
				World.events.tick.unsubscribe(event);

				form.show(player).then(callback);
			}
		});
	}
};


interface ModalFormComponentData {
	label: string;
	type: "text";
	value?: string;
}


const ModalFormComponentType = class {


	constructor(type: string, callback: (form: ModalFormData,data:ModalFormComponentData) => ModalFormData) {
		ModalFormComponentTypes[type] = callback;
	}
};




const ModalFormDropdownComponent = new ModalFormComponentType("dropdown", (form: ModalFormData,data:) => {

	return form.dropdown()

});





new ModalForm("test", [
	{
		label: "hi",
		type: "text",
		placeholder: "test",
	},
	{
		label: "bye",
		type: "slider",
		min: 0,
		max: 10,
		step: 1,
		value: 5,
	},
]);
