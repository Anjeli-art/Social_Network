import React from "react";
import {create} from "react-test-renderer";
import {Status} from "./Status";



describe("Status component", () => {
    test("status from props should be in the state", () => {
        const component = create(<Status status="SUBSCRIBE TO BASIC" updateStatus={() => {
        }}/>);
        const instance = component.getInstance();
        // @ts-ignore
        const test = instance.state.status //////////////////////////////////////////////////////////////////////затипизировать тест
        expect(test).toBe("SUBSCRIBE TO BASIC");
    });
    test("after creation span status should be displayed    ", () => {
        const component = create(<Status status="SUBSCRIBE TO BASIC" updateStatus={() => {
        }}/>);
        const root = component.root;
        let span = root.findByType("span")
        expect(span).not.toBeNull();
    });
    test("after creation input not should be displayed    ", () => {
        const component = create(<Status status="SUBSCRIBE TO BASIC" updateStatus={() => {
        }}/>);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input")
        }).toThrow();
    });
    test("after creation span status text ", () => {
        const component = create(<Status status="SUBSCRIBE TO BASIC" updateStatus={() => {
        }}/>);
        const root = component.root;
        let span = root.findByType("span")
        expect(span.children[0]).toBe("SUBSCRIBE TO BASIC");
    });
    test("after click span status input ", () => {
        const component = create(<Status status="SUBSCRIBE TO BASIC" updateStatus={() => {
        }}/>);
        const root = component.root;
        let span = root.findByType("span")
        span.props.onDoubleClick()
        let input = root.findByType("input")
        expect(input.props.value).toBe("SUBSCRIBE TO BASIC");
    });
    test("callback chould be called", () => {
        const mockCallBack = jest.fn()
        const component = create(<Status status="SUBSCRIBE TO BASIC" updateStatus={mockCallBack}/>);
        const instance = component.getInstance();
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        instance.deactivateEditMode()
        expect(mockCallBack.mock.calls.length).toBe(1);
    })
});



