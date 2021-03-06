import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface Request {
    providerId: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ date, providerId }: Request): Promise<Appointment> {
        if (!providerId) {
            throw new AppError('Please insert the providerId');
        }

        const { appointmentsRepository } = new AppointmentsRepository();

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate =
            await appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = appointmentsRepository.create({
            provider_id: providerId,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
